
export default function DeleteAccountForm() {
    return (
        <div className="flex flex-col gap-1 w-2/3 md:w-2/5 lg:w-1/4 aspect-square my-20">
            <label className='text-white' htmlFor="">Enter Your Password to Confirm:</label>
            <input className='h-10 p-1 rounded-lg border-b-2 mb-4 text-maincolor border-secondarycolor focus:outline-none' type="password" name='password' />
            <button className='text-white font-bold mx-auto py-2 px-12 mt-5 mb-2 rounded-3xl bg-maincolor' type='submit'>Delete My Account</button>
        </div>
    );
}