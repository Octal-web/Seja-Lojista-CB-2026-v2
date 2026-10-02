import { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "@/Hooks/useMediaQuery";

import videoDesktop from "@/imgs/videos/cb-lojista-1-desktop.mp4";
import videoMobile from "@/imgs/videos/cb-lojista-1-mobile.mp4";

import posterDesktop from "@/imgs/content/display/poster-desktop.jpg";
import posterMobile from "@/imgs/content/display/poster-mobile.jpg";

gsap.registerPlugin(ScrollTrigger);

const PlayIcon = ({ className = "" }) => {
    return (
        <svg
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
            className={className}
        >
            <path
                d="M17 12.5L36 24L17 35.5V12.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
            />
        </svg>
    );
};

const PauseIcon = ({ className = "" }) => {
    return (
        <svg
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
            className={className}
        >
            <path
                d="M18 14V34M30 14V34"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
            />
        </svg>
    );
};

export const Video = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const videoContainerRef = useRef(null);

    const videoRef = useRef(null);

    const trackRef = useRef(null);
    const groupRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const progress =
        duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

    useEffect(() => {
        const video = videoRef.current;

        if (!video) return;

        const handleLoadedMetadata = () => {
            setDuration(Number.isFinite(video.duration) ? video.duration : 0);
        };

        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime);
        };

        const handlePlay = () => {
            setIsPlaying(true);
        };

        const handlePause = () => {
            setIsPlaying(false);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
        };

        video.addEventListener("loadedmetadata", handleLoadedMetadata);
        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("play", handlePlay);
        video.addEventListener("pause", handlePause);
        video.addEventListener("ended", handleEnded);

        return () => {
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);

            video.removeEventListener("timeupdate", handleTimeUpdate);

            video.removeEventListener("play", handlePlay);
            video.removeEventListener("pause", handlePause);
            video.removeEventListener("ended", handleEnded);
        };
    }, []);

    useEffect(() => {
        const context = gsap.context(() => {
            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            if (prefersReducedMotion) {
                gsap.set([headingRef.current, videoContainerRef.current], {
                    y: 0,
                    opacity: 1,
                });

                return;
            }

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    once: true,
                },
            });

            timeline.fromTo(
                headingRef.current,
                {
                    y: 30,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.75,
                    ease: "power2.out",
                },
            );

            timeline.fromTo(
                videoContainerRef.current,
                {
                    y: 35,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                },
                "-=0.35",
            );
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => context.revert();
    }, []);

    const toggleVideo = async () => {
        const video = videoRef.current;

        if (!video) return;

        if (video.paused) {
            try {
                await video.play();
            } catch {
                setIsPlaying(false);
            }

            return;
        }

        video.pause();
    };

    const handleSeek = (event) => {
        const video = videoRef.current;
        const nextTime = Number(event.target.value);

        if (!video || !Number.isFinite(nextTime)) return;

        video.currentTime = nextTime;
        setCurrentTime(nextTime);
    };

    const src = useMediaQuery("(min-width: 640px)")
        ? videoDesktop
        : videoMobile;

    const poster = useMediaQuery("(min-width: 640px)")
        ? posterDesktop
        : posterMobile;

    return (
        <div ref={sectionRef} className="mt-16 lg:mt-24 w-full h-full">
            <div
                ref={videoContainerRef}
                className="group relative sm:aspect-video overflow-hidden rounded-[30px] bg-black opacity-0 sm:rounded-[38px] lg:rounded-[48px]"
            >
                <video
                    ref={videoRef}
                    poster={poster}
                    src={src}
                    preload="metadata"
                    playsInline
                    onClick={toggleVideo}
                    className="h-full w-full cursor-pointer object-cover"
                />

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
                />

                <button
                    type="button"
                    onClick={toggleVideo}
                    aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
                    className={`absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white text-white transition-opacity duration-300 sm:h-24 sm:w-24 ${
                        isPlaying
                            ? "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                            : "opacity-100"
                    }`}
                >
                    {isPlaying ? (
                        <PauseIcon className="h-11 w-11" />
                    ) : (
                        <PlayIcon className="ml-1 h-12 w-12" />
                    )}
                </button>

                <div
                    className="absolute inset-x-0 bottom-0 flex items-center gap-4 px-6 pb-6 sm:gap-6 sm:px-12 sm:pb-10"
                    onClick={(event) => event.stopPropagation()}
                >
                    <button
                        type="button"
                        onClick={toggleVideo}
                        aria-label={
                            isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"
                        }
                        className={`flex h-8 w-8 shrink-0 items-center justify-center text-white ${isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}
                    >
                        {isPlaying ? (
                            <PauseIcon className="h-7 w-7" />
                        ) : (
                            <PlayIcon className="h-7 w-7" />
                        )}
                    </button>

                    <div
                        className={`relative h-5 flex-1 transition-opacity duration-300 ${isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}
                    >
                        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/45">
                            <span
                                className="block h-full bg-white"
                                style={{
                                    width: `${progress}%`,
                                }}
                            />
                        </div>

                        <input
                            type="range"
                            min="0"
                            max={duration || 0}
                            step="0.1"
                            value={currentTime}
                            onChange={handleSeek}
                            aria-label="Progresso do vídeo"
                            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
