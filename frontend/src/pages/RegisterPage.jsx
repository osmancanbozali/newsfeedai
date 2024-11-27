import Header from '../components/Header';
export default function RegisterPage() {
    return (<div className='h-screen bg-secondarycolor overflow-y-auto'>
        <header>
            <Header />
        </header>
        <body className='flex justify-center items-center'>
            <div className=' m-auto w-4/5 md:w-3/5 lg:w-2/5 aspect-square bg-maincolor rounded-lg flex flex-col gap-2 px-16 py-12 mt-20'>
                <h1 className='text-white text-3xl lg:text-4xl font-bold text-center mb-5'>Register to NewsfeedAI</h1>
                <label className='text-white font-bold' htmlFor="">Fullname:</label>
                <input className='h-10 p-1 rounded-lg border-b-2 mb-4 text-maincolor border-secondarycolor focus:outline-none' type="text" />
                <label className='text-white font-bold' htmlFor="">Email:</label>
                <input className='h-10 p-1 rounded-lg border-b-2 mb-4 text-maincolor border-secondarycolor focus:outline-none' type="email" />
                <label className='text-white font-bold' htmlFor="">Password:</label>
                <input className='h-10 p-1 rounded-lg border-b-2 mb-4 text-maincolor border-secondarycolor focus:outline-none' type="password" />
                <label className='text-white font-bold' htmlFor="">Confirm Password:</label>
                <input className='h-10 p-1 rounded-lg border-b-2 text-maincolor border-secondarycolor focus:outline-none' type="password" />
                <button className='text-maincolor font-bold mx-auto py-2 px-12 mt-5 mb-2 rounded-3xl bg-white active:bg-gray-200'>Login</button>
                <a className='underline w-fit mx-auto mb-1 text-white text-center' href="">already have an account</a>
            </div>
        </body>
    </div>
    );
}