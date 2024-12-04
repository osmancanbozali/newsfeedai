import { Link } from "react-router-dom";

export default function Header({ navList }) {
    return (
        <div className="h-20 bg-maincolor flex flex-row justify-between items-center">
            <Link to='/' className="text-white text-3xl pl-12">NewsFeedAI</Link>
            <div className="flex flex-row pr-12">
                {navList.map((navItem, index) => (
                    <Link to={navItem.path} key={index} className="text-white mx-4">{navItem.name}</Link>
                ))}
            </div>
        </div>
    );
}