import MediaPlayer from "./MediaPlayer";
export default function PodcastCard() {
    return (
        <div className="flex flex-col items-center md:flex-row gap-4 mt-10 mx-6 md:mx-4 p-6 md:p-4 h-fit bg-maincolor rounded-2xl">
            <div className="bg-white rounded-2xl flex w-1/2 md:w-1/4 aspect-square flex-col justify-center items-center">
                <h1 className="text-4xl md:text-6xl text-maincolor">24 Nov</h1>
                <h1 className="text-4xl md:text-6xl text-maincolor">2024</h1>
            </div>
            <div className="flex flex-col w-full h-full  justify-between">
                <h1 className="text-white text-xl md:text-2xl text-center md:text-left md:mt-2">Your daily Podcast is here! Listen it now to catch up with the yesterday’s most clicked news.</h1>
                <MediaPlayer />
            </div>
        </div>
    );
}