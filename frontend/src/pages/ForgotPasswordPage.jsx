import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function ForgotPasswordPage() {
    const navList = [
        { name: "Register", path: "/register" },
        { name: "Login", path: "/login" },
    ];

    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const inputStyle = 'h-10 p-1 rounded-lg border-b-2 mb-4 text-maincolor border-secondarycolor focus:outline-none';
    const invalidInputStyle = 'h-10 p-1 rounded-lg border-b-2 mb-4 text-maincolor border-red-500 focus:outline-none';

    function validate() {
        let formErrors = {};

        if (!email) {
            formErrors.email = 'Email is required';
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    }

    async function handleSumbit(e) {
        e.preventDefault();
        console.log(email);

        // Validate form
        if (validate()) {

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email })
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log("Success:", result);
                    setSuccess(true);
                } else {
                    const result = await response.json();
                    setErrors({ invalid: result.message });
                    console.log("Error:", result);
                }
            } catch (error) {
                console.error("Error:", error);
            }

        } else {
            console.log("Form validation failed");
        }
    };

    function handleChange(e) {
        setEmail(e.target.value);
    }

    return (<div className='h-screen bg-secondarycolor overflow-y-auto'>
        <header>
            <Header navList={navList} />
        </header>
        <div className='flex justify-center items-center'>
            {!success ? <form onSubmit={handleSumbit} className='m-auto w-4/5 md:w-3/5 lg:w-2/5 aspect-square bg-maincolor rounded-lg flex flex-col gap-2 px-10 md:px-20 py-16 mt-20'>
                <h1 className='text-white text-3xl lg:text-4xl font-bold text-center'>Find Your NewsfeedAI Account</h1>
                <p className='text-white text-sm lg:text-base text-center my-4'>Enter the email associated with your account to reset your password.</p>
                <label className='text-white font-bold' htmlFor="">Email:</label>
                <input className={errors.email ? invalidInputStyle : inputStyle} type="email" name='email' value={email} placeholder={errors.email ? 'Email is required!' : ''} onChange={handleChange} />
                {errors.invalid && <p className='text-red-500 text-center'>{errors.invalid}</p>}
                <button type='submit' className='text-maincolor font-bold mx-auto py-2 px-12 mt-10 mb-5 rounded-3xl bg-white active:bg-gray-200'>Reset Password</button>
                <Link className='underline w-fit mx-auto text-white text-center' to='/login'>back to login</Link>
            </form> : <div className=' m-auto w-4/5 md:w-3/5 lg:w-2/5 aspect-square bg-maincolor rounded-lg flex flex-col gap-2 px-10 md:px-16 py-12 mt-20'>
                <h1 className='text-white text-3xl lg:text-4xl font-bold text-center mb-5'>Reset Password Email Has Been Sent!</h1>
                <p className='text-white text-center'>We’ve sent a reset password email to the address you provided. Please check your inbox (and spam or promotions folder, if necessary) and click on the link to reset your password.</p>
            </div>}
        </div>
    </div>
    );
}