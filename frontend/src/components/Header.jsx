
export default function Header() {
    return (
        <div className="h-20 bg-maincolor flex flex-row justify-between items-center">
            <h1 className="text-white text-3xl pl-12">NewsfeedAI</h1>
            <div className="flex flex-row pr-12">
                <h1 className="text-white pr-10"><a href="">Register</a></h1>
                <h1 className="text-white"><a href="">Login</a></h1>
            </div>
        </div>
    );
}