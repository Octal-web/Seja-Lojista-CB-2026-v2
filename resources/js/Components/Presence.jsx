import React, { useEffect, useRef } from 'react';

import { presenceData } from '@/Data/presenceData';

import { Title } from './ui/Title';
import { Text } from './ui/Text';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ShareIcon = ({ className = '' }) => {
    return (
        <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            aria-hidden="true"
            className={className}
        >
            <g transform="translate(4.588 1.765)">
                <circle
                    cx="8.471"
                    cy="8.471"
                    r="8.471"
                    transform="translate(33.882)"
                    stroke="currentColor"
                    strokeWidth="4.941"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <circle
                    cx="8.471"
                    cy="8.471"
                    r="8.471"
                    transform="translate(0 19.765)"
                    stroke="currentColor"
                    strokeWidth="4.941"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <circle
                    cx="8.471"
                    cy="8.471"
                    r="8.471"
                    transform="translate(33.882 39.529)"
                    stroke="currentColor"
                    strokeWidth="4.941"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <line
                    x2="19.285"
                    y2="11.238"
                    transform="translate(15.784 32.499)"
                    stroke="currentColor"
                    strokeWidth="4.941"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <line
                    x1="19.256"
                    y2="11.238"
                    transform="translate(15.784 12.734)"
                    stroke="currentColor"
                    strokeWidth="4.941"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    );
};

const HomeIcon = ({ className = '' }) => {
    return (
        <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            aria-hidden="true"
            className={className}
        >
            <g transform="translate(3.459 1.983)">
                <path
                    d="M54.852,76.085V52.493A2.949,2.949,0,0,0,51.9,49.544h-11.8a2.949,2.949,0,0,0-2.949,2.949V76.085"
                    transform="translate(-19.464 -20.052)"
                    stroke="currentColor"
                    strokeWidth="5.161"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M12.386,31.849a5.9,5.9,0,0,1,2.092-4.507L35.12,9.649a5.9,5.9,0,0,1,7.614,0L63.378,27.343a5.9,5.9,0,0,1,2.091,4.506V58.39a5.9,5.9,0,0,1-5.9,5.9H18.284a5.9,5.9,0,0,1-5.9-5.9Z"
                    transform="translate(-12.386 -8.255)"
                    stroke="currentColor"
                    strokeWidth="5.161"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    );
};

const PaletteIcon = ({ className = '' }) => {
    return (
        <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            aria-hidden="true"
            className={className}
        >
            <g transform="translate(1.948 1.948)">
                <path
                    d="M38.026,56.727a12.468,12.468,0,0,1-24.935,0v-37.4a6.234,6.234,0,0,1,6.234-6.234H31.792a6.234,6.234,0,0,1,6.234,6.234Z"
                    transform="translate(-13.091 -13.091)"
                    stroke="currentColor"
                    strokeWidth="5.455"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M60.779,56.727h7.169a6.234,6.234,0,0,1,6.234,6.234V75.429a6.234,6.234,0,0,1-6.234,6.234h-37.4"
                    transform="translate(-18.078 -25.558)"
                    stroke="currentColor"
                    strokeWidth="5.455"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M30.545,74.182h.031"
                    transform="translate(-18.078 -30.545)"
                    stroke="currentColor"
                    strokeWidth="5.455"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M46.629,31.161,53.8,23.993a7.481,7.481,0,0,1,10.61.012l5.91,5.91a7.481,7.481,0,0,1,.081,10.7L43.2,67.941"
                    transform="translate(-21.694 -15.577)"
                    stroke="currentColor"
                    strokeWidth="5.455"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    );
};

const CalendarIcon = ({ className = '' }) => {
    return (
        <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            aria-hidden="true"
            className={className}
        >
            <g transform="translate(4.588 1.765)">
                <path
                    d="M31.624,7.906V19.2"
                    transform="translate(-17.506 -7.906)"
                    stroke="currentColor"
                    strokeWidth="4.941"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M63.247,7.906V19.2"
                    transform="translate(-26.541 -7.906)"
                    stroke="currentColor"
                    strokeWidth="4.941"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <rect
                    width="50.824"
                    height="50.824"
                    rx="7.906"
                    transform="translate(0 5.647)"
                    stroke="currentColor"
                    strokeWidth="4.941"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M11.859,39.529H62.682"
                    transform="translate(-11.859 -16.941)"
                    stroke="currentColor"
                    strokeWidth="4.941"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M35.576,60.988l5.647,5.647L52.518,55.341"
                    transform="translate(-18.635 -21.459)"
                    stroke="currentColor"
                    strokeWidth="4.941"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    );
};

const RocketIcon = ({ className = '' }) => {
    return (
        <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            aria-hidden="true"
            className={className}
        >
            <g transform="translate(1.807 1.808)">
                <path
                    d="M48.578,58.409V72.866s8.761-1.59,11.566-5.783c3.123-4.684,0-14.458,0-14.458"
                    transform="translate(-21.108 -20.818)"
                    stroke="currentColor"
                    strokeWidth="5.06"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M15.9,66.2c-4.337,3.643-5.783,14.458-5.783,14.458s10.814-1.446,14.458-5.783A6.146,6.146,0,0,0,15.9,66.2"
                    transform="translate(-10.12 -24.273)"
                    stroke="currentColor"
                    strokeWidth="5.06"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M36.433,37.011A63.614,63.614,0,0,1,42.216,25.59,37.243,37.243,0,0,1,74.023,8.1c0,7.865-2.255,21.686-17.349,31.807a64.77,64.77,0,0,1-11.566,5.783Z"
                    transform="translate(-17.638 -8.095)"
                    stroke="currentColor"
                    strokeWidth="5.06"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M30.65,43.411H16.193s1.59-8.761,5.783-11.566c4.684-3.123,14.458.145,14.458.145"
                    transform="translate(-11.855 -14.495)"
                    stroke="currentColor"
                    strokeWidth="5.06"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    );
};

const iconComponents = {
    share: ShareIcon,
    home: HomeIcon,
    palette: PaletteIcon,
    calendar: CalendarIcon,
    rocket: RocketIcon,
};

export const Presence = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const descriptionRef = useRef(null);
    const labelRef = useRef(null);
    const cardRefs = useRef([]);
    const quoteRef = useRef(null);

    useEffect(() => {
        const context = gsap.context(() => {
            const cards = cardRefs.current.filter(Boolean);

            const prefersReducedMotion = window.matchMedia(
                '(prefers-reduced-motion: reduce)'
            ).matches;

            if (prefersReducedMotion) {
                gsap.set(
                    [
                        headingRef.current,
                        descriptionRef.current,
                        labelRef.current,
                        quoteRef.current,
                        ...cards,
                    ],
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                    }
                );

                return;
            }

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 72%',
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
                    ease: 'power2.out',
                }
            );

            timeline.fromTo(
                descriptionRef.current,
                {
                    y: 20,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power2.out',
                },
                '-=0.4'
            );

            timeline.fromTo(
                labelRef.current,
                {
                    y: 15,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power2.out',
                },
                '-=0.25'
            );

            timeline.fromTo(
                cards,
                {
                    y: 35,
                    opacity: 0,
                    scale: 0.97,
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.65,
                    stagger: 0.1,
                    ease: 'power2.out',
                },
                '-=0.25'
            );

            timeline.fromTo(
                quoteRef.current,
                {
                    y: 18,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.55,
                    ease: 'power2.out',
                },
                '-=0.2'
            );
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => context.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            aria-labelledby="presence-title"
            className="relative bg-[#eee6da] pb-28 pt-20 sm:pb-32 sm:pt-24 xl:pb-40 xl:pt-32"
        >
            <div className="container max-w-large">
                <Title
                    ref={headingRef}
                    id="presence-title"
                    as="h2"
                    variant="display"
                    weight="thin"
                    className="mx-auto max-w-[900px] text-center text-primary"
                >
                    Você representa uma marca
                    <span className="block">
                        reconhecida pelo consumidor
                    </span>
                </Title>

                <Text
                    ref={descriptionRef}
                    as="p"
                    variant="none"
                    weight="light"
                    className="mx-auto mt-4 md:mt-8 max-w-[660px] text-center text-xs sm:text-sm leading-[1.8] text-primary/75 md:text-base"
                >
                    Além da força comercial local, sua loja contará com uma marca
                    que investe continuamente em posicionamento e relacionamento
                    com o mercado.
                </Text>

                <Title
                    ref={labelRef}
                    as="h3"
                    variant="subsection"
                    weight="semibold"
                    className="mt-8 lg:mt-16 text-center text-primary 2xl:mt-20"
                >
                    Presença em:
                </Title>

                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
                    {presenceData.map((item, index) => {
                        const Icon = iconComponents[item.icon];

                        return (
                            <article
                                ref={(element) => {
                                    cardRefs.current[index] = element;
                                }}
                                key={item.id}
                                className="flex min-h-[145px] flex-col items-center justify-center rounded-[25px] bg-primary px-6 py-4 xl:py-8 text-center text-[#eee6da] lg:min-h-[200px] 2xl:min-h-[235px]"
                            >
                                <div className="mb-4 xl:mb-8">
                                    <Icon className="size-12 2xl:size-15"/>
                                </div>

                                <Text
                                    as="p"
                                    variant="none"
                                    weight="normal"
                                    className="text-lg leading-[1.35] text-white"
                                >
                                    {item.label.map((line) => (
                                        <span key={line} className="mr-1 lg:block">
                                            {line}
                                        </span>
                                    ))}
                                </Text>
                            </article>
                        );
                    })}
                </div>
            </div>

            <div
                ref={quoteRef}
                className="absolute bottom-0 left-0 right-0 z-[1]"
            >
                <div className="absolute bottom-0 left-1/2 w-[calc(100%-3rem)] max-w-[630px] translate-x-[-50%] translate-y-1/2 rounded-full border border-primary bg-white px-6 py-3 text-center sm:px-10">
                    <Text
                        as="p"
                        variant="none"
                        weight="light"
                        className="text-base text-primary sm:text-xl"
                    >
                        “Você não precisa construir uma marca do zero.”
                    </Text>
                </div>
            </div>
        </section>
    );
};