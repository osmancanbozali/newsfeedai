import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    function validate() {
        let formErrors = {};

        if (!formData.email) {
            formErrors.email = 'Email is required';
        }

        if (!formData.password) {
            formErrors.password = 'Password is required';
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    }

    async function handleSumbit(e) {
        e.preventDefault();
        console.log(formData);

        // Validate form
        if (validate()) {

            try {
                const response = await fetch(`http://localhost:3000/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // Specify JSON format
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log("Success:", result);
                } else {
                    const result = await response.json();
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
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    return (<div className='h-screen bg-secondarycolor overflow-y-auto'>
        <header>
            <Header />
        </header>
        <div className='flex justify-center items-center'>
            <form onSubmit={handleSumbit} className='m-auto w-4/5 md:w-3/5 lg:w-2/5 aspect-square bg-maincolor rounded-lg flex flex-col gap-2 px-20 py-16 mt-20'>
                <h1 className='text-white text-3xl lg:text-4xl font-bold text-center mb-16'>Login to NewsfeedAI</h1>
                <label className='text-white font-bold' htmlFor="">Email:</label>
                <input className='h-10 p-1 rounded-lg border-b-2 mb-4 text-maincolor border-secondarycolor focus:outline-none' type="email" name='email' value={formData.email} placeholder={errors.email ? 'Email is required!' : ''} onChange={handleChange} />
                <label className='text-white font-bold' htmlFor="">Password:</label>
                <input className='h-10 p-1 rounded-lg border-b-2 text-maincolor border-secondarycolor focus:outline-none' type="password" name='password' value={formData.password} placeholder={errors.password ? 'Password is required!' : ''} onChange={handleChange} />
                <button type='submit' className='text-maincolor font-bold mx-auto py-2 px-12 mt-10 mb-5 rounded-3xl bg-white active:bg-gray-200'>Login</button>
                <Link className='underline w-fit mx-auto mb-1 text-white text-center' to='/'>forgot my password</Link>
                <Link className='underline w-fit mx-auto text-white text-center' to='/register'>i don't have an account</Link>
            </form>
        </div>
    </div>
    );
}