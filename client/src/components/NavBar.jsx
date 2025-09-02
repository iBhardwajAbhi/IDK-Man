import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const NavBar = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    return (
        <div className='flex items-center justify-around flex-col sm:flex-row gap-2 my-2'>
            <h1 className='hover:cursor-pointer pt-2 !text-amber-300 hover:!text-amber-600' 
            onClick={() => { navigate('/') }}>IDK-Man 😎</h1>
            <button className='sm:hidden' onClick={()=>setOpen(!open)}>
                {!open ? '☰' : 'X'}</button>
            {
            <div className={`sm:flex flex-col sm:flex-row justify-evenly sm:min-w-md text-center gap-2 ${open ? 'flex': 'hidden'}`}>
                <a href="https://www.github.com/ibhardwajabhi/idk-man" target='_blank'>Source Code 🚀</a>
                <a href="https://www.linkedin.com/in/ibhardwajabhi" target='_blank'>Connect with Me 👨‍💻</a>
            </div>
            }
        </div>
    )
}

export default NavBar