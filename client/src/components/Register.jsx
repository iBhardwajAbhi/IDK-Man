import React, { useState } from 'react'
import useUserStore from '../store/userStore'

const Register = () => {

    const { setUsername } = useUserStore()
    const [name, setName] = useState("")
    return (
        <div className='flex flex-col w-[40%] m-auto gap-4 border-2 p-4 rounded-md my-8'>
            <h1 className='my-4'>Welcome to IDK-Man</h1>
            <div>
                Enter your username
            </div>
            <input type="text"
                placeholder='abhinav87'
                onChange={(e) => {
                    setName(e.target.value)
                }} />
            <button
                onClick={async () => {
                    await setUsername(name)
                }}
            >Save</button>
        </div>
    )
}

export default Register