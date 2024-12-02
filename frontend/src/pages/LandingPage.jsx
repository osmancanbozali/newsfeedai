import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
export default function LandingPage() {
    const navigate = useNavigate();

    function goToLogin() {
        navigate('/login');
    }

    return (<div className='h-screen bg-secondarycolor overflow-y-auto flex flex-col'>
        <header>
            <Header />
        </header>
        <div className='flex flex-col'>
            <h1 className='text-white font-bold text-center text-2xl md:text-4xl lg:text-6xl leading-[1.5] pt-28'>Quick, Personalized, Distraction-free News<br />- Anytime, Anywhere!</h1>
            <p className='text-white text-sm md:text-base text-center italic pt-20'>Stay updated effortlessly with our AI-powered app.<br />
                We fetch, summarize, and voice the latest news daily.<br />
                Hear yesterday's most clicked stories in your podcast.<br />
                Enjoy a quick, personalized, distraction-free news experience.
            </p>
            <button onClick={goToLogin} className='text-white font-bold mx-auto py-2 px-12 my-20 rounded-3xl bg-maincolor'>Try Now!</button>
        </div>
        <p className='mt-auto mb-1 text-sm md:text-base text-white text-center'>Made by <a className='underline' href="https://github.com/osmancanbozali" target='_blank'>Osmancan Bozali</a></p>
    </div>);
}