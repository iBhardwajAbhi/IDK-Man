import React, { useEffect, useRef, useState } from 'react'
import { socket } from '../lib/Socket'
import useChatStore from '../store/chatStore'

const ChatBox = () => {
    const { messages, newMessage } = useChatStore()
    const [message, setMessage] = useState("")
    const endRef = useRef(null)

    const sendMessage = () => {
        if (message.trim() !== '') {
            socket.emit('message', message)
            setMessage('')
        }
    }

    useEffect(() => {
        socket.on('message', ({ message, sender }) => {
            newMessage({ text: message, sender: sender })
        })
        return () => {
            socket.off('message');
        };
    }, [])

    useEffect(() => {
        if (endRef.current) {
            endRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])
    return (
        <div className='flex flex-col gap-2 flex-1 m-2'>
            <h1>Chat Box</h1>
            <div className='flex flex-col justify-end flex-1'>
                {
                    messages.length === 0 ?
                        <div className='text-center'>No messages yet</div>
                        :
                        <ul className='list-image-none max-h-[60vh] overflow-y-scroll'>
                            {
                                messages.map((data) => {
                                    return <li><strong>{data.sender.toUpperCase()}</strong>: {data.text}</li>
                                })
                            }
                            <div ref={endRef}></div>
                        </ul>
                }
            </div>
            <div className='flex w-full'>

                <input className='flex-1 mx-1' type="text" value={message} onChange={(e) => {
                    setMessage(e.target.value)
                }}
                    onKeyDown={(e) => { e.key === 'Enter' && sendMessage() }}
                />
                <button onClick={() => { sendMessage() }}>Send</button>
            </div>
        </div>
    )
}

export default ChatBox