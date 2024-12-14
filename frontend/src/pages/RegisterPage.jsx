import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function RegisterPage() {
    const navList = [
        { name: "Register", path: "/register" },
        { name: "Login", path: "/login" },
    ];
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const inputStyle = 'h-10 p-1 rounded-lg border-b-2 mb-4 text-maincolor border-secondarycolor focus:outline-none';
    const invalidInputStyle = 'h-10 p-1 rounded-lg border-b-2 mb-4 text-maincolor border-red-500 focus:outline-none';

    function validate() {
        let formErrors = {};

        if (!formData.fullname) {
            formErrors.fullname = 'Fullname is required';
        }

        if (!formData.email) {
            formErrors.email = 'Email is required';
        }

        if (!formData.password) {
            formErrors.password = 'Password is required';
        }

        if (!formData.confirmPassword) {
            formErrors.confirmPassword = 'Confirm Password is required';
        }

        if (formData.password !== formData.confirmPassword) {
            formErrors.notMatch = 'Passwords do not match!';
        }

        if (formData.password.length < 6 && formData.confirmPassword.length < 6) {
            formErrors.shortPassword = 'Password must be at least 6 characters long';
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    }

    async function handleSumbit(e) {
        e.preventDefault();

        // Validate form
        if (validate()) {
            console.log(formData);

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // Specify JSON format
                    },
                    body: JSON.stringify(formData)
                });
                const result = await response.json();
                if (response.ok) {
                    console.log("Success:", result);
                    navigate('/login');
                } else {
                    console.log("Error:", result);
                    if (result.message === 'User with this email already exists.') {
                        setErrors({ sendError: 'User with this email already exists.' });
                    } else {
                        setErrors({ sendError: 'Registiration failed, Please try again' });
                    }
                }
            } catch (error) {
                console.error("Error:", error);
                console.log(`Error: ${error}`);
                setErrors({ sendError: 'Registiration failed, Please try again' });
            }

        } else {
            console.log("Form validation failed");
        }
    };

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    return (<div className='h-screen bg-secondarycolor overflow-y-auto'>
        <header>
            <Header navList={navList} />
        </header>
        <div className='flex justify-center items-center'>
            <form onSubmit={handleSumbit} className=' m-auto w-4/5 md:w-3/5 lg:w-2/5 aspect-square bg-maincolor rounded-lg flex flex-col gap-2 px-10 md:px-16 py-12 mt-20'>
                <h1 className='text-white text-3xl lg:text-4xl font-bold text-center mb-5'>Register to NewsfeedAI</h1>
                <label className='text-white font-bold' htmlFor="">Fullname:</label>
                <input className={errors.fullname ? invalidInputStyle : inputStyle} type="text" name='fullname' value={formData.fullname} placeholder={errors.fullname ? 'Username is required!' : ''} onChange={handleChange} />
                <label className='text-white font-bold' htmlFor="">Email:</label>
                <input className={errors.email ? invalidInputStyle : inputStyle} type="email" name='email' value={formData.email} placeholder={errors.email ? 'Email is required!' : ''} onChange={handleChange} />
                <label className='text-white font-bold' htmlFor="">Password:</label>
                <input className={errors.password || errors.notMatch ? invalidInputStyle : inputStyle} type="password" name='password' value={formData.password} placeholder={errors.password ? 'Password is required!' : ''} onChange={handleChange} />
                <label className='text-white font-bold' htmlFor="">Confirm Password:</label>
                <input className={errors.confirmPassword || errors.notMatch ? invalidInputStyle : inputStyle} type="password" name='confirmPassword' value={formData.confirmPassword} placeholder={errors.confirmPassword ? 'Confirm Password is required!' : ''} onChange={handleChange} />
                {errors.sendError && <p className='text-red-500 text-center'>{errors.sendError}</p>}
                {errors.notMatch && !errors.password && !errors.confirmPassword && <p className='text-red-500 text-center'>{errors.notMatch}</p>}
                {errors.shortPassword && <p className='text-red-500 text-center'>{errors.shortPassword}</p>}
                <button className='text-maincolor font-bold mx-auto py-2 px-12 mt-5 mb-2 rounded-3xl bg-white active:bg-gray-200' type='submit'>Register</button>
                <Link className='underline w-fit mx-auto mb-1 text-white text-center' to='/login'>already have an account</Link>
            </form>
        </div>
    </div>
    );
}