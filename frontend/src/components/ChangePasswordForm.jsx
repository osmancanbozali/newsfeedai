import { useState } from "react";
export default function ChangePasswordForm({ onClose }) {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [errors, setErrors] = useState({});

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function validate() {
        let formErrors = {};

        if (!formData.currentPassword) {
            formErrors.CurrentPassword = 'Current Password is required';
        }

        if (!formData.newPassword) {
            formErrors.confirmPassword = 'New Password is required';
        }

        if (!formData.confirmNewPassword) {
            formErrors.confirmPassword = 'Confirm Password is required';
        }

        if (formData.newPassword !== formData.confirmNewPassword) {
            formErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);

        if (validate()) {
            try {
                const response = await fetch(`http://localhost:3000/user/update-password`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData)
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
        else {
            console.log("Form validation failed");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-1 w-2/3 md:w-2/5 lg:w-1/4 aspect-square my-20">
            <label className='text-white' htmlFor="">Current Password:</label>
            <input onChange={handleChange} className='h-10 p-1 rounded-lg border-b-2 mb-4 text-maincolor border-secondarycolor focus:outline-none' type="password" name='currentPassword' value={formData.currentPassword} placeholder={errors.currentPassword ? errors.currentPassword : ''} />
            <label className='text-white' htmlFor="">New Password:</label>
            <input onChange={handleChange} className='h-10 p-1 rounded-lg border-b-2 mb-4 text-maincolor border-secondarycolor focus:outline-none' type="password" name='newPassword' value={formData.newPassword} placeholder={errors.password ? errors.newPassword : ''} />
            <label className='text-white' htmlFor="">Confirm New Password:</label>
            <input onChange={handleChange} className='h-10 p-1 rounded-lg border-b-2 text-maincolor border-secondarycolor focus:outline-none' type="password" name='confirmNewPassword' value={formData.confirmNewPassword} placeholder={errors.password ? errors.confirmNewPassword : ''} />
            <button className='text-white font-bold mx-auto py-2 px-12 mt-5 mb-2 rounded-3xl bg-maincolor active:bg-gray-600' type='submit'>Save</button>
        </form>
    );
}