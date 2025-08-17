import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    const [photo, setPhoto] = useState(1)

    useEffect(() => {
        const interval = setInterval(() => {
            setPhoto(prev => prev % 3 + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return <div className='flex flex-col justify-around h-[80vh] w-4/5 m-auto gap-4'>
        <h1>Challenge Your Friends in Real-Time Quiz Battles</h1>
        <h2>Create a quiz or join one instantly. Answer questions, chat live, and compete for the top spot. Correct answers at end.</h2>
        <img src={`${photo}.png`} alt="" width={"700px"} className='mx-auto border-2 p-1 rounded-xl h-[350px]' />
        <button
            className='self-center !bg-green-700 hover:!bg-green-900 hidden md:block'
            onClick={() => {
                navigate('/create')
            }}
        >Start Playing Now</button>
        <h1 className='md:hidden'>Use desktop to play - coming to mobile soon 📱</h1>
    </div>;
};

export default Home;
