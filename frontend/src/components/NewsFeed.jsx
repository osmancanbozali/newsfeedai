import NewsCard from "./NewsCard";
export default function NewsFeed() {
    return (
        <div className="flex flex-col">
            <h1 className='text-white font-bold text-2xl md:text-4xl lg:text-5xl mt-10 ml-8'>Latest News:</h1>
            <div className="flex flex-row justify-between p-8 w-full overflow-auto">
                <button className="text-white text-xs lg:text-base font-bold text-center px-2 py-1 flex-1 min-w-[100px] max-w-[150px] mr-2 mt-5 mb-2 rounded-2xl bg-maincolor active:bg-gray-600">For You</button>
                <button className="text-white text-xs lg:text-base font-bold text-center px-2 py-1 flex-1 min-w-[100px] max-w-[150px] mx-2 mt-5 mb-2 rounded-2xl bg-maincolor active:bg-gray-600">General</button>
                <button className="text-white text-xs lg:text-base font-bold text-center px-2 py-1 flex-1 min-w-[100px] max-w-[150px] mx-2 mt-5 mb-2 rounded-2xl bg-maincolor active:bg-gray-600">Nation</button>
                <button className="text-white text-xs lg:text-base font-bold text-center px-2 py-1 flex-1 min-w-[100px] max-w-[150px] mx-2 mt-5 mb-2 rounded-2xl bg-maincolor active:bg-gray-600">World</button>
                <button className="text-white text-xs lg:text-base font-bold text-center px-2 py-1 flex-1 min-w-[100px] max-w-[150px] mx-2 mt-5 mb-2 rounded-2xl bg-maincolor active:bg-gray-600">Business</button>
                <button className="text-white text-xs lg:text-base font-bold text-center px-2 py-1 flex-1 min-w-[100px] max-w-[150px] mx-2 mt-5 mb-2 rounded-2xl bg-maincolor active:bg-gray-600">Entertainment</button>
                <button className="text-white text-xs lg:text-base font-bold text-center px-2 py-1 flex-1 min-w-[100px] max-w-[150px] mx-2 mt-5 mb-2 rounded-2xl bg-maincolor active:bg-gray-600">Science</button>
                <button className="text-white text-xs lg:text-base font-bold text-center px-2 py-1 flex-1 min-w-[100px] max-w-[150px] mx-2 mt-5 mb-2 rounded-2xl bg-maincolor active:bg-gray-600">Sports</button>
                <button className="text-white text-xs lg:text-base font-bold text-center px-2 py-1 flex-1 min-w-[100px] max-w-[150px] ml-2 mt-5 mb-2 rounded-2xl bg-maincolor active:bg-gray-600">Technology</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8" >
                <NewsCard />
                <NewsCard />
                <NewsCard />
                <NewsCard />
                <NewsCard />
                <NewsCard />
                <NewsCard />
                <NewsCard />
                <NewsCard />
                <NewsCard />
                <NewsCard />
                <NewsCard />
            </div>
            <button className='text-white font-bold mx-auto py-2 px-12 my-8 rounded-3xl bg-maincolor active:bg-gray-600'>Load More..</button>
        </div>
    );
}