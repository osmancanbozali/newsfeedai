import { useState } from "react";
import Header from "../components/Header";
import ChangeFullnameForm from "../components/ChangeFullnameForm";
import ChangePasswordForm from "../components/ChangePasswordForm";
import ResetPreferencesForm from "../components/ResetPreferencesForm";
import DeleteAccountForm from "../components/DeleteAccountForm";

export default function SettingsPage() {
    const [activeForm, setActiveForm] = useState(null);

    const activeButton = "text-white font-bold text-xs md:text-sm lg:text-base mx-2 lg:mx-4 py-2 px-5 lg:px-10 rounded-3xl bg-gray-600";
    const inactiveButton = "text-white font-bold text-xs md:text-sm lg:text-base mx-2 lg:mx-4 py-2 px-5 lg:px-10 rounded-3xl bg-maincolor";

    const handleActiveForm = (form) => {
        setActiveForm(form);
    }

    const handleCloseForm = () => {
        setActiveForm(null);
    }

    return (
        <div className="h-screen bg-secondarycolor overflow-y-auto">
            <header>
                <Header />
            </header>
            <h1 className="text-white font-bold text-3xl md:text-4xl lg:text-5xl m-12">Settings:</h1>
            <div className="flex flex-col items-center">
                <div className="flex flex-row">
                    <button onClick={() => handleActiveForm('changeFullname')} className={activeForm === 'changeFullname' ? activeButton : inactiveButton} >Change Fullname</button>
                    <button onClick={() => handleActiveForm('changePassword')} className={activeForm === 'changePassword' ? activeButton : inactiveButton} >Change Password</button>
                    <button onClick={() => handleActiveForm('resetPreferences')} className={activeForm === 'resetPreferences' ? activeButton : inactiveButton} >Reset Preferences</button>
                    <button onClick={() => handleActiveForm('deleteAccount')} className={activeForm === 'deleteAccount' ? activeButton : inactiveButton} >Delete Account</button>
                </div>
                {activeForm === 'changeFullname' && <ChangeFullnameForm onClose={handleCloseForm} />}
                {activeForm === 'changePassword' && <ChangePasswordForm onClose={handleCloseForm}/>}
                {activeForm === 'resetPreferences' && <ResetPreferencesForm onClose={handleCloseForm} />}
                {activeForm === 'deleteAccount' && <DeleteAccountForm onClose={handleCloseForm} />}
            </div>
        </div>
    );
}