import React from 'react'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    const navigate = useNavigate()
    return (
        <div className='flex items-center justify-around flex-col sm:flex-row'>
            <h1 className='hover:cursor-pointer pt-2 !text-amber-300 hover:!text-amber-600' onClick={() => { navigate('/') }}>IDK-Man 😎</h1>
            <div className='flex gap-8'>
                <a href="https://www.github.com/ibhardwajabhi/idk-man" target='_blank'>Source Code 🚀</a>
                <a href="https://www.linkedin.com/in/ibhardwajabhi" target='_blank'>Connect with Dev 👨‍💻</a>
            </div>
        </div>
    )
}

export default NavBar