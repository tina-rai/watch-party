"use client";

import { useRef, useState } from "react";

export default function VideoPlayer() {
    //telling typescript this ref will eventually point to an HTML <video> element
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlayPause = async () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      await video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;

    if (!video) return;

    setDuration(video.duration);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;

    if (!video) return;

    setCurrentTime(video.currentTime);
  };

  return (
    <div>
        //connects the React ref to the actual browser DOM element.
      <video
        ref={videoRef}
        src="/sample.mp4"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        className="w-full"
      />

      <button onClick={handlePlayPause}>
        {isPlaying ? "Pause" : "Play"}
      </button>

      <p>
        {currentTime.toFixed(1)} / {duration.toFixed(1)}
      </p>
    </div>
  );
}