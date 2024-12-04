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
            formErrors.confirmPassword = 'Passwords do not match';
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
                const response = await fetch(`http://localhost:3000/auth/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // Specify JSON format
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log("Success:", result);
                    navigate('/login');
                } else {
                    console.log("Error: Failed to send request");
                }
            } catch (error) {
                console.error("Error:", error);
                console.log(`Error: ${error}`);
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
            <form onSubmit={handleSumbit} className=' m-auto w-4/5 md:w-3/5 lg:w-2/5 aspect-square bg-maincolor rounded-lg flex flex-col gap-2 px-16 py-12 mt-20'>
                <h1 className='text-white text-3xl lg:text-4xl font-bold text-center mb-5'>Register to NewsfeedAI</h1>
                <label className='text-white font-bold' htmlFor="">Fullname:</label>
                <input className='h-10 p-1 rounded-lg border-b-2 mb-4 text-maincolor border-secondarycolor focus:outline-none' type="text" name='fullname' value={formData.fullname} placeholder={errors.fullname ? 'Username is required!' : ''} onChange={handleChange} />
                <label className='text-white font-bold' htmlFor="">Email:</label>
                <input className='h-10 p-1 rounded-lg border-b-2 mb-4 text-maincolor border-secondarycolor focus:outline-none' type="email" name='email' value={formData.email} placeholder={errors.email ? 'Email is required!' : ''} onChange={handleChange} />
                <label className='text-white font-bold' htmlFor="">Password:</label>
                <input className='h-10 p-1 rounded-lg border-b-2 mb-4 text-maincolor border-secondarycolor focus:outline-none' type="password" name='password' value={formData.password} placeholder={errors.password ? 'Password is required!' : ''} onChange={handleChange} />
                <label className='text-white font-bold' htmlFor="">Confirm Password:</label>
                <input className='h-10 p-1 rounded-lg border-b-2 text-maincolor border-secondarycolor focus:outline-none' type="password" name='confirmPassword' value={formData.confirmPassword} placeholder={errors.confirmPassword ? 'Confirm Password is required!' : ''} onChange={handleChange} />
                <button className='text-maincolor font-bold mx-auto py-2 px-12 mt-5 mb-2 rounded-3xl bg-white active:bg-gray-200' type='submit'>Login</button>
                <Link className='underline w-fit mx-auto mb-1 text-white text-center' to='/login'>already have an account</Link>
            </form>
        </div>
    </div>
    );
}