
export default function ResetPreferencesForm({onClose}) {

    async function handleResetPreferences() {
        try {
            const response = await fetch(`http://localhost:3000/user/reset-preferences`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
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
            console.error(error);
        }
    }


    return (
        <div className="flex flex-col gap-1 w-2/3 md:w-2/5 lg:w-1/4 aspect-square my-20">
            <h1 className="text-white text-xl lg:text-2xl font-bold text-center mb-8">Are you sure you want to reset your preferences?</h1>
            <p className="text-white text-sm md:text-base text-center italic">This action will clear your news history and reset your personalized recommendations. This cannot be undone.</p>
            <div className="flex flex-row justify-center mt-4">
                <button onClick={handleResetPreferences} className='text-white font-bold mx-auto py-2 px-12 rounded-3xl bg-maincolor active:bg-gray-600'>Yes</button>
                <button onClick={onClose} className='text-white font-bold mx-auto py-2 px-12 rounded-3xl bg-maincolor active:bg-gray-600'>No</button>
            </div>
        </div>
    )
}