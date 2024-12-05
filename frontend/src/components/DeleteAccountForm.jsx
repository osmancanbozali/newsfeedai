import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function DeleteAccountForm() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');

    function handleChange(e) {
        setPassword(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(password);

        try {
            const response = await fetch(`http://localhost:3000/user/delete`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password })
            });
            if (response.ok) {
                const result = await response.json();
                console.log("Success:", result);
                navigate('/login');
            } else {
                const result = await response.json();
                console.log("Error:", result);
            }
        } catch (error) {
            console.error("Error:", error);

        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-1 w-2/3 md:w-2/5 lg:w-1/4 aspect-square my-20">
            <label className='text-white' htmlFor="">Enter Your Password to Confirm:</label>
            <input onChange={handleChange} className='h-10 p-1 rounded-lg border-b-2 mb-4 text-maincolor border-secondarycolor focus:outline-none' type="password" name='password' />
            <button className='text-white font-bold mx-auto py-2 px-12 mt-5 mb-2 rounded-3xl bg-maincolor' type='submit'>Delete My Account</button>
        </form>
    );
}