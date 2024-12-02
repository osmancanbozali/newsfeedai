import { useState, useEffect } from "react";
import NewsCard from "./NewsCard";

export default function NewsFeed() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('for you');
    const [page, setPage] = useState(1);

    const activeButton = "text-white text-xs lg:text-base font-bold text-center px-2 py-1 flex-1 min-w-[100px] max-w-[150px] mr-2 mt-5 mb-2 rounded-2xl bg-gray-600";
    const inactiveButton = "text-white text-xs lg:text-base font-bold text-center px-2 py-1 flex-1 min-w-[100px] max-w-[150px] mr-2 mt-5 mb-2 rounded-2xl bg-maincolor";

    const fetchPersonalizedNews = async () => {
        setLoading(true);
        setSelectedCategory('for you');
        try {
            const response = await fetch('http://localhost:3000/news/feed', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                console.log(response);
                throw new Error('Can not fetch from server');
            }
            let newsData = await response.json();
            setNews(newsData.newsArticles);
            setError(null);
        } catch (error) {
            setError(error.message);
            console.log(error);
            setNews(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPersonalizedNews();
    }, []);

    const handleCategoryChange = async (category) => {
        setLoading(true);
        setPage(1);
        setSelectedCategory(category);
        try {
            const response = await fetch(`http://localhost:3000/news/category/${category}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error('Can not fetch from server');
            }
            let newsData = await response.json();
            setNews(newsData.newsArticles);
            setError(null);
        } catch (error) {
            setError(error.message);
            setNews(null);
        } finally {
            setLoading(false);
        }
    }

    const handleLoadMore = async () => {
        setPage(page + 1);
        try {
            if (selectedCategory === 'for you') {
                const response = await fetch(`http://localhost:3000/news/feed?page=${page}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error('Can not fetch from server');
                }
                let newsData = await response.json();
                setNews((prev) => [...prev, ...newsData.newsArticles]);
                setError(null);
                return;
            }
            const response = await fetch(`http://localhost:3000/news/category/${selectedCategory}?${page}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error('Can not fetch from server');
            }
            let newsData = await response.json();
            setNews((prev) => [...prev, ...newsData.newsArticles]);
            setError(null);
        } catch (error) {
            setError(error.message);
            setNews(null);
        }
    }

    return (
        <div className="flex flex-col">
            <h1 className='text-white font-bold text-2xl md:text-4xl lg:text-5xl mt-10 ml-8'>Latest News:</h1>
            <div className="flex flex-row justify-between p-8 w-full overflow-auto">
                <button onClick={fetchPersonalizedNews} className={selectedCategory === "for you" ? activeButton : inactiveButton}>For You</button>
                <button onClick={() => handleCategoryChange("general")} className={selectedCategory === "general" ? activeButton : inactiveButton}>General</button>
                <button onClick={() => handleCategoryChange("nation")} className={selectedCategory === "nation" ? activeButton : inactiveButton}>Nation</button>
                <button onClick={() => handleCategoryChange("world")} className={selectedCategory === "world" ? activeButton : inactiveButton}>World</button>
                <button onClick={() => handleCategoryChange("business")} className={selectedCategory === "business" ? activeButton : inactiveButton}>Business</button>
                <button onClick={() => handleCategoryChange("entertainment")} className={selectedCategory === "entertainment" ? activeButton : inactiveButton}>Entertainment</button>
                <button onClick={() => handleCategoryChange("science")} className={selectedCategory === "science" ? activeButton : inactiveButton}>Science</button>
                <button onClick={() => handleCategoryChange("sports")} className={selectedCategory === "sports" ? activeButton : inactiveButton}>Sports</button>
                <button onClick={() => handleCategoryChange("technology")} className={selectedCategory === "technology" ? activeButton : inactiveButton}>Technology</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8" >
                {loading ? <div className='text-white font-bold text-2xl mx-auto'>Loading...</div> : news && news.map((article, index) => <NewsCard key={index} article={article} />)}
            </div>
            <button onClick={handleLoadMore} className='text-white font-bold mx-auto py-2 px-12 my-8 rounded-3xl bg-maincolor active:bg-gray-600'>Load More..</button>
        </div>
    );
}