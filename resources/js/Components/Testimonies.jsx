import React, { useEffect, useRef, useState } from "react";

import { testimonies as defaultTestimonies } from "@/Data/testimonies";

import { Text } from "@/Components/ui/Text";
import { Title } from "@/Components/ui/Title";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LinkButton } from "./ui/LinkButton";

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

const getInitials = (name) => {
    const parts = name.trim().split(/\s+/);

    if (parts.length === 1) {
        return parts[0].charAt(0);
    }

    return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`;
};

const TestimonyAvatar = ({ avatar, name }) => {
    const [hasImageError, setHasImageError] = useState(false);

    if (!avatar || hasImageError) {
        return (
            <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary/25 text-sm font-medium uppercase text-primary"
            >
                {getInitials(name)}
            </span>
        );
    }

    return (
        <img
            src={avatar}
            alt=""
            width="44"
            height="44"
            loading="lazy"
            decoding="async"
            onError={() => setHasImageError(true)}
            className="h-11 w-11 shrink-0 rounded-full object-cover"
        />
    );
};

const TestimonyCard = ({ testimony }) => {
    return (
        <article className="flex min-h-[270px] w-[340px] shrink-0 flex-col rounded-[26px] border border-primary/15 bg-white px-7 py-7 text-primary sm:w-[380px] sm:px-8 sm:py-8 transition-all hover:-translate-y-5">
            <span
                aria-hidden="true"
                className="block text-4xl font-light leading-none text-secondary"
            >
                “
            </span>

            <Text
                as="blockquote"
                variant="none"
                weight="light"
                className="text-[15px] leading-tight sm:text-base tracking-tight"
            >
                {testimony.quote}
            </Text>

            <div className="mt-auto flex items-center gap-3 pt-8">
                <TestimonyAvatar
                    avatar={testimony.avatar}
                    name={testimony.name}
                />

                <div className="min-w-0">
                    <Text
                        as="strong"
                        variant="none"
                        weight="medium"
                        className="block truncate text-sm sm:text-base"
                    >
                        {testimony.name}
                    </Text>

                    <Text
                        as="span"
                        variant="none"
                        weight="light"
                        className="mt-0.5 block text-xs leading-snug text-primary/50"
                    >
                        {testimony.role} / {testimony.location}
                    </Text>
                </div>
            </div>
        </article>
    );
};

export const Testimonies = ({
    testimonies = defaultTestimonies,
    carouselSpeed = 42,
}) => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const videoContainerRef = useRef(null);
    const carouselRef = useRef(null);

    const videoRef = useRef(null);

    const trackRef = useRef(null);
    const groupRef = useRef(null);

    const carouselDistanceRef = useRef(0);
    const carouselPositionRef = useRef(0);
    const carouselPausedRef = useRef(false);
    const carouselMotionRef = useRef({
        direction: 1,
    });

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
                gsap.set(
                    [
                        headingRef.current,
                        videoContainerRef.current,
                        carouselRef.current,
                    ],
                    {
                        y: 0,
                        opacity: 1,
                    },
                );

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

            timeline.fromTo(
                carouselRef.current,
                {
                    y: 25,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    ease: "power2.out",
                },
                "-=0.3",
            );
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => context.revert();
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        const firstGroup = groupRef.current;

        if (!section || !track || !firstGroup) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        const measureCarousel = () => {
            const newDistance = firstGroup.offsetWidth;

            if (!newDistance) return;

            const previousDistance = carouselDistanceRef.current;

            if (previousDistance > 0) {
                const currentProgress = gsap.utils.clamp(
                    0,
                    1,
                    (carouselPositionRef.current + previousDistance) /
                        previousDistance,
                );

                carouselPositionRef.current =
                    -newDistance + currentProgress * newDistance;
            } else {
                carouselPositionRef.current = -newDistance;
            }

            carouselDistanceRef.current = newDistance;

            gsap.set(track, {
                x: carouselPositionRef.current,
            });
        };

        measureCarousel();

        const resizeObserver = new ResizeObserver(() => {
            measureCarousel();
        });

        resizeObserver.observe(firstGroup);

        if (prefersReducedMotion) {
            gsap.set(track, {
                x: 0,
            });

            return () => {
                resizeObserver.disconnect();
            };
        }

        const tickerCallback = (time, deltaTime) => {
            if (carouselPausedRef.current || !carouselDistanceRef.current) {
                return;
            }

            const movement =
                carouselMotionRef.current.direction *
                Math.max(carouselSpeed, 1) *
                (deltaTime / 1000);

            carouselPositionRef.current += movement;

            carouselPositionRef.current = gsap.utils.wrap(
                -carouselDistanceRef.current,
                0,
                carouselPositionRef.current,
            );

            gsap.set(track, {
                x: carouselPositionRef.current,
            });
        };

        gsap.ticker.add(tickerCallback);

        const directionTrigger = ScrollTrigger.create({
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
                const nextDirection = self.direction === -1 ? -1 : 1;

                gsap.to(carouselMotionRef.current, {
                    direction: nextDirection,
                    duration: 0.35,
                    ease: "power2.out",
                    overwrite: true,
                });
            },
        });

        return () => {
            resizeObserver.disconnect();
            directionTrigger.kill();

            gsap.ticker.remove(tickerCallback);
            gsap.killTweensOf(carouselMotionRef.current);
        };
    }, [carouselSpeed, testimonies]);

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

    const pauseCarousel = () => {
        carouselPausedRef.current = true;
    };

    const resumeCarousel = () => {
        carouselPausedRef.current = false;
    };

    return (
        <section
            ref={sectionRef}
            aria-labelledby="testimonies-title"
            className="overflow-hidden bg-white pb-10 sm:pb-12 xl:pb-16"
            id="lojistas"
        >
            <div className="rounded-b-[46px] bg-[#f5f5f5] pb-28 pt-20 sm:pb-40 sm:pt-24 lg:pb-56 lg:pt-32">
                <div className="container max-w-large">
                    <Title
                        ref={headingRef}
                        id="testimonies-title"
                        as="h2"
                        variant="display"
                        weight="thin"
                        className="mx-auto max-w-[760px] text-center text-primary"
                    >
                        Quem investiu viveu uma
                        <span className="block">transformação</span>
                    </Title>
                </div>
            </div>

            <div className="container max-w-large">
                <div
                    ref={videoContainerRef}
                    className="group relative -mt-20 aspect-video overflow-hidden rounded-[30px] bg-black opacity-0 sm:-mt-28 sm:rounded-[38px] lg:-mt-44 lg:rounded-[48px]"
                >
                    <video
                        ref={videoRef}
                        src="/content/videos/depo-video.mp4"
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
                        aria-label={
                            isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"
                        }
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
                            className="flex h-8 w-8 shrink-0 items-center justify-center text-white"
                        >
                            {isPlaying ? (
                                <PauseIcon className="h-7 w-7" />
                            ) : (
                                <PlayIcon className="h-7 w-7" />
                            )}
                        </button>

                        <div className="relative h-5 flex-1">
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

            <div
                ref={carouselRef}
                role="region"
                aria-label="Depoimentos de lojistas"
                className="relative mt-20 opacity-0 sm:mt-24 xl:mt-32"
                onMouseEnter={pauseCarousel}
                onMouseLeave={resumeCarousel}
                onFocusCapture={pauseCarousel}
                onBlurCapture={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                        resumeCarousel();
                    }
                }}
            >
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-24 xl:w-36" />

                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-24 xl:w-36" />

                <div className="">
                    <div
                        ref={trackRef}
                        className="flex w-max will-change-transform"
                    >
                        {[0, 1, 2].map((groupIndex) => (
                            <div
                                ref={groupIndex === 0 ? groupRef : undefined}
                                key={groupIndex}
                                aria-hidden={
                                    groupIndex === 0 ? undefined : true
                                }
                                className="flex shrink-0 gap-5 pr-5 sm:gap-7 sm:pr-7"
                            >
                                {testimonies.map((testimony) => (
                                    <TestimonyCard
                                        key={`${groupIndex}-${testimony.id}`}
                                        testimony={testimony}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <LinkButton
                href={`${route("Home.index")}#orcamento`}
                className="flex gap-2 mt-10 sm:mt-12 xl:mt-16 mx-auto"
            >
                <svg
                    width="27"
                    height="27"
                    viewBox="0 0 27 27"
                    fill="none"
                    aria-hidden="true"
                    className="shrink-0"
                >
                    <path
                        d="M4 13.5H22M15.5 7L22 13.5L15.5 20"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

                <span>Quero ser um lojistas da <span className="whitespace-nowrap">Casa Brasileira</span></span>
            </LinkButton>
        </section>
    );
};
