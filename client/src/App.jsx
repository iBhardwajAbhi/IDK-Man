import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Create from './pages/Create';
import Result from './pages/Result';
import NavBar from './components/NavBar';

function App() {

    return (
        <BrowserRouter>
            <div className='flex flex-col justify-between h-[100vh]'>
                <Toaster position='top-center' />
                <NavBar />
                <Routes>
                    <Route
                        path='/'
                        element={<Home />}
                    />
                    <Route path='/create'
                        element={<Create />}
                    />
                    <Route
                        path='/quiz/:quizId'
                        element={<Quiz />}
                    />
                    <Route
                        path='/result'
                        element={<Result />}
                    />
                </Routes>
                <div className='text-center my-4'>Copyright © 2025 IDK-Man. All rights reserved.</div>
            </div>
        </BrowserRouter>
    );
}

export default App;
