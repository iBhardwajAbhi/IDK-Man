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
            <h1>Winner is {sortedScores && sortedScores[0] ? sortedScores[0].username.toUpperCase() : "ABHINAV"} 🎉</h1>
            <div>
                <h1>Solutions : </h1>
                {
                    quizData?.map((data) => {
                        return <div className='flex flex-col items-start my-2 border-2 p-2 rounded-md'>
                            <p className='font-bold'>Question : {data.question}</p>
                            <p>A. {data.a}</p>
                            <p>B. {data.b}</p>
                            <p>C. {data.c}</p>
                            <p>D. {data.d}</p>
                            <p className='font-bold'>Answer : {data.answer}</p>
                        </div>
                    })
                }
            </div>
            <button onClick={() => { navigate('/create') }}>Back to Home</button>
        </div>
    )
}

export default Result