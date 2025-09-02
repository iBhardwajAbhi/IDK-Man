import React from 'react'
import useScoreStore from '../store/scoreStore'
import { useLocation, useNavigate } from 'react-router-dom'

const Result = () => {
    const { scores } = useScoreStore()
    const location = useLocation()
    const navigate = useNavigate()
    const quizData = location.state || []
    const sortedScores = scores ? Object.values(scores).sort((a, b) => b.score - a.score) : []

    return (
        <div className='flex flex-col w-[80%] m-auto gap-4'>
            <h1>{"Winner is "}
                { sortedScores && sortedScores[0] ? sortedScores[0].username.toUpperCase() + " ( " +sortedScores[0].score + " )" : "ABHINAV"} 🎉
                </h1>
            <div>
                {
                    quizData?.map((data) => {
                        return <div className='flex flex-col items-start my-2 border-2 p-2 rounded-md !bg-gray-950'>
                            <p className='font-bold !text-blue-400'>Question : {data.question}</p>
                            <p className={data.answer === 'a' ? '!text-green-400' : "!text-red-100"}>A. {data.a}</p>
                            <p className={data.answer === 'b' ? '!text-green-400' : "!text-red-100"}>B. {data.b}</p>
                            <p className={data.answer === 'c' ? '!text-green-400' : "!text-red-100"}>C. {data.c}</p>
                            <p className={data.answer === 'd' ? '!text-green-400' : "!text-red-100"}>D. {data.d}</p>
                        </div>
                    })
                }
            </div>
            <button onClick={() => { navigate('/create') }}>Back to Home</button>
        </div>
    )
}

export default Result