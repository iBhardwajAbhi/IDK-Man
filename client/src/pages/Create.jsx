import Register from '../components/Register'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../store/userStore'
import { useEffect, useState } from 'react'
import { socket } from '../lib/Socket'
import useQuizStore from '../store/quizStore'
import useScoreStore from '../store/scoreStore'
import toast from 'react-hot-toast'

const Create = () => {
    const { username } = useUserStore()
    const navigate = useNavigate()
    const { quiz, joinQuiz } = useQuizStore()
    const { resetQuiz } = useScoreStore()

    const [topic, setTopic] = useState("")
    const [length, setLength] = useState("10")
    const [level, setLevel] = useState("Easy")
    const [quizId, setQuizId] = useState("")

    function generateQuizId() {
        let id = '';
        for (let i = 0; i < 6; i++) {
            id += Math.floor(Math.random() * 10);
        }
        return id;
    }

    const createQuiz = () => {
        if (topic.trim() !== '' && username.trim() !== '') {
            const quizId = generateQuizId()
            socket.emit('create-quiz', quizId, topic, level, length)
            joinQuiz(quizId)
            resetQuiz()
            navigate(`/quiz/${quizId}`)
        } else {
            toast.error('Topic cant be blank')
        }
    }

    useEffect(() => {
        if (username.trim() !== '')
            socket.emit('login', username)
        resetQuiz()
    }, [username])

    useEffect(() => {
        resetQuiz()
    }, [])

    return (
        <div >
            {
                username ?
                    <div>
                        <div className='flex flex-col sm:w-[50%] my-4 m-auto gap-2 border-2 p-4 rounded-md !bg-gray-950'>
                            <h1>Join a Quiz</h1>
                            <label htmlFor="">Enter quiz id</label>
                            <input type="text" placeholder='12345' value={quizId} onChange={(e) => { setQuizId(e.target.value) }} />
                            <button onClick={() => {
                                if (quizId !== '') {
                                    joinQuiz(quizId)
                                    resetQuiz()
                                    navigate(`/quiz/${quizId}`)

                                } else {
                                    toast.error('Quiz id cant be blank')
                                }
                            }}>Join Now</button>
                        </div>
                        <div className='flex flex-col sm:w-[50%] m-auto gap-2 border-2 p-4 rounded-md mt-8 !bg-gray-950'>
                            <h1>Create New Quiz</h1>
                            <label htmlFor="">Enter topic for quiz</label>
                            <input type="text" name="" id="" value={topic} onChange={(e) => { setTopic(e.target.value) }} />
                            <label htmlFor="">Choose difficulty level</label>
                            <select name="level" id="" value={level} onChange={(e) => { setLevel(e.target.value) }}>
                                <option value="easy">Easy</option>
                                <option value="moderate">Moderate</option>
                                <option value="hard">Hard</option>
                            </select>
                            <label htmlFor="">Choose number of Questions</label>
                            <select name="length" id="" value={length} onChange={(e) => { setLength(e.target.value) }}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                            <button
                                onClick={() => { createQuiz() }}
                            >Create Quiz</button>
                        </div>
                    </div>
                    :
                    <Register
                        onRegister={() => {
                            setUsername(getUser)
                        }}
                    />
            }
        </div>
    )
}

export default Create