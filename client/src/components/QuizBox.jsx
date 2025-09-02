import React, { useEffect, useState } from 'react'
import { socket } from '../lib/Socket'
import useUserStore from '../store/userStore'
import { InfinitySpin } from 'react-loader-spinner'
import toast from 'react-hot-toast'
import { redirect, useNavigate } from 'react-router-dom'

const QuizBox = () => {
    const [data, setData] = useState(null)
    const [isDisabled, setIsDisabled] = useState(false)
    const { username } = useUserStore()
    const navigate = useNavigate()
    useEffect(() => {
        socket.on('new-question', (question) => {
            setData(question)
            setIsDisabled(false)
        })

        return () => {
            socket.off('new-question');
        }
    }, [])

    useEffect(() => {
        socket.on('quiz-end', (quizData) => {
            setData(null)
            toast.success('Quiz Ended')
            navigate('/result', { state: quizData })
        })

        return () => {
            socket.off('quiz-end');
        }
    }, [])
    return (
        <div className='lg:w-[50%] border-2 p-4'>
            <h1>Quiz</h1>
            {data ? <div className='flex flex-col gap-4'>
                <div>Question number : {data.id}</div>
                <h1 className='!text-start'>{data.question}</h1>
                <button disabled={isDisabled} onClick={() => {
                    setIsDisabled(true)
                    const correct = data.answer === "a"
                    socket.emit('answer', { username, correct })
                    if (correct) {
                        toast.success('Correct')
                    } else {
                        toast.error('Incorrect')
                    }
                }}>
                    A. {data.a}
                </button>
                <button disabled={isDisabled} onClick={() => {
                    setIsDisabled(true)
                    const correct = data.answer === "b"
                    socket.emit('answer', { username, correct })
                    if (correct) {
                        toast.success('Correct')
                    } else {
                        toast.error('Incorrect')
                    }
                }}>
                    B. {data.b}
                </button>
                <button disabled={isDisabled} onClick={() => {
                    setIsDisabled(true)
                    const correct = data.answer === "c"
                    socket.emit('answer', { username, correct })
                    if (correct) {
                        toast.success('Correct')
                    } else {
                        toast.error('Incorrect')
                    }
                }}>
                    C. {data.c}
                </button>
                <button disabled={isDisabled} onClick={() => {
                    setIsDisabled(true)
                    const correct = data.answer === "d"
                    socket.emit('answer', { username, correct })
                    if (correct) {
                        toast.success('Correct')
                    } else {
                        toast.error('Incorrect')
                    }
                }}>
                    D. {data.d}
                </button>
            </div>
                :
                <div className='w-[70%] flex flex-col items-center m-auto my-[20vh]'>
                    <h2>Starting quiz. Please wait. It might take upto 30 seconds.</h2>
                    <InfinitySpin
                        visible={true}
                        width="200"
                        color="white    "
                        ariaLabel="infinity-spin-loading"
                    />
                </div>
            }
        </div>
    )
}

export default QuizBox