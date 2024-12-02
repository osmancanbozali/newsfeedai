import React, { useState, useRef, useEffect } from "react";
import PlayIcon from "../assets/icons/play.svg";
import PauseIcon from "../assets/icons/pause.svg";
import BackIcon from "../assets/icons/back.svg";
import ForwardIcon from "../assets/icons/forward.svg";

export default function MediaPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const skipTime = (amount) => {
        audioRef.current.currentTime += amount;
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div className="flex flex-col items-center text-white p-6 w-full">
            <audio
                ref={audioRef}
                src="add_the_audio_file_path_here.mp3"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            />
            <div className="flex flex-row justify-center gap-8 w-full mt-4 mb-6">
                <button onClick={() => skipTime(-10)} className="bg-white hover:bg-gray-600 rounded-full p-1">
                    <img src={BackIcon} alt="Back" />
                </button>
                <button onClick={togglePlayPause} className="bg-white hover:bg-gray-600 rounded-full p-1">
                    <img src={isPlaying ? PauseIcon : PlayIcon} alt={isPlaying ? "Stop Audio" : "Play Audio"} />
                </button>
                <button onClick={() => skipTime(10)} className="bg-white hover:bg-gray-600 rounded-full p-1">
                    <img src={ForwardIcon} alt="Forward" />
                </button>
            </div>
            <div className="flex items-center w-full">
                <span className="text-sm">{formatTime(currentTime)}</span>
                <input
                    type="range"
                    value={currentTime}
                    max={duration}
                    onChange={(e) => {
                        audioRef.current.currentTime = e.target.value;
                        setCurrentTime(e.target.value);
                    }}
                    className="w-full mx-4"
                />
                <span className="text-sm">{formatTime(duration)}</span>
            </div>
        </div>
    );
};