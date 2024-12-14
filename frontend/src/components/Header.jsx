import { Link } from "react-router-dom";

export default function Header({ navList }) {
    return (
        <div className="h-20 bg-maincolor flex flex-row justify-between items-center">
            <Link to='/' className="text-white text-3xl pl-6 md:pl-12">NewsFeedAI</Link>
            <div className="flex flex-row pr-3 md:pr-12">
                {navList.map((navItem, index) => (
                    <Link to={navItem.path} key={index} className="text-white mx-2 md:mx-4">{navItem.name}</Link>
                ))}
            </div>
        </div>
    );
}