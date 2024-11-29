
export default function NewsCard() {
    return (
        <div className="bg-maincolor rounded-2xl p-4 min-h-[350px] max-h-[450px] flex flex-col justify-between">
            <div>
                <div className="flex flex-row justify-between mb-5">
                    <h1 className="text-white font-semibold text-2xl">News Title</h1>
                    <p className="text-white">General</p>
                </div>
                <p className="text-white">
                    This will be the summary of the article which will be fetched from the API.
                </p>
            </div>
            <div className="flex flex-row justify-between w-full">
                <p className="text-white">26/05/2003 10:00</p>
                <p className="text-white">Click to Expand</p>
                <p className="text-white">Bloomberg</p>
            </div>
        </div>

    );
}