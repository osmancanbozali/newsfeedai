import Header from '../components/Header';
import PodcastCard from '../components/PodcastCard';
import NewsFeed from '../components/NewsFeed';
export default function FeedPage() {
    return (<div className='h-screen bg-secondarycolor overflow-y-auto flex flex-col'>
        <header>
            <Header />
        </header>
        <div className='flex flex-col'>
            <h1 className='text-white font-bold text-2xl md:text-4xl lg:text-5xl mt-10 ml-8'>Welcome back, Osmancan Bozali!</h1>
        </div>
        <PodcastCard />
        <NewsFeed />
    </div>);
}














