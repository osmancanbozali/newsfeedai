import { useState } from "react";
export default function ChangeFullnameForm({onClose}) {
    const [fullname, setFullname] = useState('');

    function handleChange(e) {
        setFullname(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(fullname);

        try {
            const response = await fetch(`http://localhost:3000/user/update-name`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ4MTUzYjhhMGQwOWNjODcwNDRhMjUiLCJlbWFpbCI6InpAeC5jb20iLCJpYXQiOjE3MzI3NzcyOTMsImV4cCI6MTczMjc4MDg5M30.QzOqxIY2rPnC2fHC9FN6apAzt2giUX7XcI1DxzvqLNY`
                },
                body: JSON.stringify({ fullname })
            });
            if (response.ok) {
                const result = await response.json();
                console.log("Success:", result);
                onClose();
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
            <label className='text-white' htmlFor="">Enter Your New Fullname:</label>
            <input onChange={handleChange} className='h-10 p-1 rounded-lg border-b-2 mb-4 text-maincolor border-secondarycolor focus:outline-none' type="text" name='fullname' value={fullname} />
            <button className='text-white font-bold mx-auto py-2 px-12 mt-5 mb-2 rounded-3xl bg-maincolor active:bg-gray-600' type='submit'>Save</button>
        </form>
    );
}