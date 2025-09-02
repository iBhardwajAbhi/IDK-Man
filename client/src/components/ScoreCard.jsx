import React, { useEffect } from 'react'
import useScoreStore from '../store/scoreStore'
import { socket } from '../lib/Socket'

const ScoreCard = () => {
    const { scores, updateScores } = useScoreStore()

    useEffect(() => {
        socket.on("score-update", (scores) => {
            updateScores(scores)
        })
        return () => {
            socket.off("score-update")
        }

    }, [])

    return (
        <div className='min-w-max m-2 flex-1'>
            <h1 className='mb-2 mx-2'>Score Card</h1>
            {
                scores ?
                    <ul className='list-image-none'>
                        {
                            scores.sort((a, b) => b.score - a.score).map((data, i) => {
                                return <li className=''><h2>{i + 1} - {data.username.toUpperCase()} -- {data.score}</h2></li>
                            })
                        }
                    </ul>
                    :
                    <div>
                        No user present
                    </div>
            }
        </div>
    )
}

export default ScoreCard