import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const inputStyle = 'h-10 p-1 rounded-lg border-b-2 mb-4 text-maincolor border-secondarycolor focus:outline-none';
    const invalidInputStyle = 'h-10 p-1 rounded-lg border-b-2 mb-4 text-maincolor border-red-500 focus:outline-none';

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function validate() {
        let formErrors = {};

        if (!formData.password) {
            formErrors.password = 'Password is required';
        }

        if (!formData.confirmPassword) {
            formErrors.confirmPassword = 'Confirm Password is required';
        }

        if (formData.password !== formData.confirmPassword) {
            formErrors.notMatch = 'Passwords do not match';
        }

        if (formData.password.length < 6 && formData.confirmPassword.length < 6) {
            formErrors.shortPassword = 'Password must be at least 6 characters long';
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);

        if (validate()) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/resetPassword?token=${token}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    const result = await response.json();
                    console.log("Success:", result);
                    setSuccess(true);
                } else {
                    const result = await response.json();
                    console.log("Error:", result);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
        else {
            console.log("Form validation failed");
        }
    }

    return (
        <div className='h-screen bg-secondarycolor overflow-y-auto flex'>
            {!success ? <form onSubmit={handleSubmit} className='m-auto w-4/5 md:w-3/5 lg:w-2/5 aspect-square bg-maincolor rounded-lg flex flex-col gap-2 px-10 md:px-20 py-16 mt-20 justify-center'>
                <h1 className='text-white text-3xl lg:text-4xl font-bold text-center mb-8'>Reset Your Password</h1>
                <label className='text-white' htmlFor="">New Password:</label>
                <input onChange={handleChange} className={errors.password ? invalidInputStyle : inputStyle} type="password" name='password' value={formData.password} placeholder={errors.password ? errors.password : ''} />
                <label className='text-white' htmlFor="">Confirm New Password:</label>
                <input onChange={handleChange} className={errors.confirmPassword ? invalidInputStyle : inputStyle} type="password" name='confirmPassword' value={formData.confirmPassword} placeholder={errors.confirmPassword ? errors.confirmPassword : ''} />
                {errors.notMatch && !errors.password && !errors.confirmPassword && <p className='text-red-500 text-center'>{errors.notMatch}</p>}
                {errors.shortPassword && <p className='text-red-500 text-center'>{errors.shortPassword}</p>}
                <button className='text-maincolor font-bold mx-auto py-2 px-12 mt-10 mb-5 rounded-3xl bg-white active:bg-gray-200' type='submit'>Reset Password</button>
            </form> : <div className=' m-auto w-4/5 md:w-3/5 lg:w-2/5 aspect-square bg-maincolor rounded-lg flex flex-col gap-2 px-10 md:px-16 py-12 mt-20'>
                <h1 className='text-white text-3xl lg:text-4xl font-bold text-center mb-5'>Your Password Has Been Changed Successfully!</h1>
                <p className='text-white text-center'>Now you can login to your account using your new password.</p>
                <button className='text-maincolor font-bold mx-auto py-2 px-12 mt-10 mb-5 rounded-3xl bg-white active:bg-gray-200' onClick={() => navigate('/login')}>Go Back To Login</button>
            </div>}
        </div>
    );
};