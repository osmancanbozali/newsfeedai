import Header from '../components/Header';
export default function LandingPage() {
    return (<div className='h-screen bg-secondarycolor relative'>
        <header>
            <Header />
        </header>
        <body className='flex flex-col'>
            <h1 className='text-white font-bold text-center text-6xl leading-[1.5] pt-28'>Quick, Personalized, Distraction-free News<br />- Anytime, Anywhere!</h1>
            <p className='text-white text-center italic pt-20'>Stay updated effortlessly with our AI-powered app.<br />
                We fetch, summarize, and voice the latest news daily.<br />
                Hear yesterday's most clicked stories in your podcast.<br />
                Enjoy a quick, personalized, distraction-free news experience.
            </p>
            <button className='text-white font-bold mx-auto py-2 px-12 mt-20 rounded-3xl bg-maincolor'>Try Now!</button>
            <p className='absolute inset-x-0 bottom-1 text-white text-center'>Made by <a className='underline' href="">Osmancan Bozali</a></p>
        </body>
    </div>);
}