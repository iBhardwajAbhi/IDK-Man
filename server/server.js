const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const prompt = require('./prompt');
const cors = require('cors')

const app = express();
const PORT = 3000;

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
	},
});

app.use(bodyParser.json());

app.use(cors())

server.listen(PORT, () => {
	console.log(`Socket IO Server is running on PORT : ${PORT}`);
});

const users = {};

const quizes = {};

io.on('connection', (socket) => {
	socket.on('login', (username) => {
		if (users[socket.id]) return;

		users[socket.id] = {
			userId: socket.id,
			username: username,
			quizId: null,
			score: 0,
		};

		console.log(`Login : ${username} -> (${socket.id}) `);
	});

	socket.on('message', (msg) => {
		const user = users[socket.id];
		const sender = user ? user.username : 'Unknown';

		const messageData = {
			message: msg,
			sender: sender,
		};
		if (user) io.to(user.quizId).emit('message', messageData);
	});

	socket.on('disconnect', () => {
		const user = users[socket.id];
		if (user) {
			quizId = user.quizId;
			delete users[socket.id];
			if (quizId) io.to(quizId).emit('score-update', users);
		} else {
			console.log(`Client disconnected: ${socket.id}`);
		}
	});

	socket.on('create-quiz', async (quizId, topic, level, length) => {
		const user = users[socket.id];
		if (user) {
			const quizData = await prompt(topic, level, length);
			quizes[quizId] = {
				quizId: quizId,
				quizData: quizData,
				admin: user.username,
				currentQuestion: 0,
				maxQuestion: length,
				createdAt: Date.now(),
			};
			startQuizBroadCast(quizId);
			console.log(`Quiz created : ${quizId} By : ${user.username} Topic : ${topic}`);
		}
	});

	socket.on('join-quiz', async (quizId) => {
		if (users[socket.id]) {
			if (users[socket.id].quizId) socket.leave(users[socket.id].quizId);
			users[socket.id].quizId = quizId;
			users[socket.id].score = 0;
			socket.join(quizId);
			io.to(quizId).emit(
				'score-update',
				Object.values(users).filter((user) => user.quizId === quizId)
			);
		} else {
			console.error('User not logged in.');
		}
	});

	socket.on('answer', ({ username, correct }) => {
		const user = users[socket.id];
		if (user && user.username === username) {
			if (correct) {
				users[socket.id].score += 10;
			} else {
				users[socket.id].score -= 5;
			}
			io.to(user.quizId).emit(
				'score-update',
				Object.values(users).filter((usr) => usr.quizId === user.quizId)
			);
		}
	});
});

const startQuizBroadCast = async (quizId) => {
	const quiz = quizes[quizId];

	if (!quiz) return;

	const interval = setInterval(() => {
		if (quiz.currentQuestion >= quiz.maxQuestion) {
			clearInterval(interval);
			io.to(quizId).emit(
				'score-update',
				Object.values(users).filter((user) => user.quizId === quizId)
			);
			io.to(quizId).emit('quiz-end', quizes[quizId].quizData);
			console.log(`Quiz ended : ${quizId}`);
			delete quizes[quizId];
		} else {
			if (quizId)
				io.to(quizId).emit(
					'score-update',
					Object.values(users).filter((user) => user.quizId === quizId)
				);
			io.to(quizId).emit('new-question', quiz.quizData[quiz.currentQuestion]);
			quiz.currentQuestion += 1;
		}
	}, 30 * 1000);
};
