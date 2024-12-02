import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="h-20 bg-maincolor flex flex-row justify-between items-center">
            <h1 className="text-white text-3xl pl-12">NewsfeedAI</h1>
            <div className="flex flex-row pr-12">
                <h1 className="text-white pr-10"><Link to="/register">Register</Link></h1>
                <h1 className="text-white pr-10"><Link to="/login">Login</Link></h1>
                <h1 className="text-white pr-10"><Link to="/feed">Feed</Link></h1>
                <h1 className="text-white pr-10"><Link to="/settings">Settings</Link></h1>
            </div>
        </div>
    );
}