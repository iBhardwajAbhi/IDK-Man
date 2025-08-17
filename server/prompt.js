const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const prompt = async (topic, level, length) => {
	const response = await ai.models.generateContent({
		model: 'gemini-2.5-flash',
		contents:
			'Give me a quiz of ' +
			length +
			'questions and level : ' +
			level +
			' in json array format with id:1 question:, a:optiona, b:afsdfs 4 options and answer:a, on this topic :' +
			topic,
	});
	const match = response.text.match(/```json([\s\S]*?)```/i);
	if (match && match[1]) {
		return JSON.parse(match[1].trim());
	} else {
		console.warn(response.text);
		return [
			{
				id: 1,
				question: 'You entered something highly unexpected.',
				a: 'Yup',
				b: 'May be',
				c: 'Okay',
				d: 'Noooo',
				answer: 'd',
			},
		];
	}
};

module.exports = prompt;
