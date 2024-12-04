import { useEffect, useState } from 'react';
import Header from '../components/Header';
import PodcastCard from '../components/PodcastCard';
import NewsFeed from '../components/NewsFeed';
export default function FeedPage() {
    const navList = [
        { name: "Feed", path: "/feed" },
        { name: "Settings", path: "/settings" },
    ];

    const [fullname, setFullname] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchFullname() {
            try {
                const response = await fetch(`http://localhost:3000/user/get-name`, {
                    method: "GET",
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setFullname(data.fullname);
                } else {
                    console.error('Failed to fetch full name:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching full name:', error.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchFullname();
    } , []);

    return (<div className='h-screen bg-secondarycolor overflow-y-auto flex flex-col'>
        <header>
            <Header navList={navList} />
        </header>
        <div className='flex flex-col'>
            {isLoading ? null : <h1 className='text-white font-bold text-2xl md:text-4xl lg:text-5xl mt-10 ml-8'>Welcome back, {fullname}!</h1>}
        </div>
        <PodcastCard />
        <NewsFeed />
    </div>);
}














