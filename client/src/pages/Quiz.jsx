import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatBox from '../components/ChatBox';
import Register from '../components/Register';
import { socket } from '../lib/Socket';
import QuizBox from '../components/QuizBox';
import useUserStore from '../store/userStore';
import useQuizStore from '../store/quizStore';
import ScoreCard from '../components/ScoreCard';
import toast from 'react-hot-toast';
import useChatStore from '../store/chatStore';
import useScoreStore from '../store/scoreStore';

const Quiz = () => {
    const { quizId } = useParams()
    const { username } = useUserStore()
    const { quiz, joinQuiz } = useQuizStore()
    const { resetMessages } = useChatStore()
    const { resetQuiz } = useScoreStore()

    useEffect(() => {
        if (username.trim() !== '' && quizId.trim() !== '') {
            joinQuiz(quizId)
            socket.emit('login', username)
            socket.emit('join-quiz', quizId)
        }
        resetMessages()
        resetQuiz()
    }, [])

    return <div>
        {
            username ?
                <div>
                    <div className='flex justify-center gap-2 my-2'>
                        <h1>Quiz ID : {quizId} </h1>
                        <button className='!py-1 mx-2 uppercase' onClick={async () => {
                            await navigator.clipboard.writeText(quiz.quizId)
                            toast.success('Copied : ' + quizId)
                        }}>Copy to Share</button>
                    </div>
                    <div className='flex flex-row justify-around gap-4 m-4 border-2 rounded-md h-[75vh]'>
                        <ScoreCard />
                        <QuizBox />
                        <ChatBox />
                    </div>
                </div>
                :
                <Register />
        }
    </div>
};

export default Quiz;
