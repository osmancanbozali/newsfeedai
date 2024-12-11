import { useState, useEffect } from "react";
import MediaPlayer from "./MediaPlayer";
export default function PodcastCard() {
    const [podcastUrl, setPodcastUrl] = useState("");
    const [podcastDate, setPodcastDate] = useState("");
    const [loading, setLoading] = useState(true);

    const formatDate = (podcastDate) => {
        const date = new Date(podcastDate);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Intl.DateTimeFormat('en-GB', options).format(date);
    }

    useEffect(() => {
        const fetchPodcast = async () => {
            setLoading(true);
            try {
                const response = await fetch("http://localhost:3000/podcast/today", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
                );
                const data = await response.json();
                setPodcastUrl(data.podcast.podcastUrl);
                setPodcastDate(data.podcast.createdAt);
            } catch (error) {
                console.error("Error fetching podcast data: ", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPodcast();
    }, []);

    return (
        <div className="flex flex-col items-center md:flex-row gap-4 mt-10 mx-6 md:mx-4 p-6 md:p-4 h-fit bg-maincolor rounded-2xl">
            <div className="bg-white rounded-2xl flex w-1/2 md:w-1/4 aspect-square flex-col justify-center items-center">
                <h1 className="text-4xl md:text-5xl text-maincolor text-center">{podcastDate ? formatDate(podcastDate) : "Daily Podcast"}</h1>
            </div>
            <div className="flex flex-col w-full h-full  justify-between">
                <h1 className="text-white text-xl md:text-2xl text-center md:text-left md:mt-2">{podcastUrl ? "Your daily Podcast is here! Listen it now to catch up with the yesterday’s most clicked news." : "Your daily podcast is not available at the moment!, Please come back tomorrow."}</h1>
                {loading ? <h1 className="text-white text-xl md:text-2xl text-center md:text-left md:mt-2">Loading...</h1> : <MediaPlayer audioUrl={podcastUrl} />}
            </div>
        </div>
    );
}