import React, { useEffect, useRef } from "react";

import { steps } from "@/Data/steps";

import { Title } from "./ui/Title";
import { Text } from "./ui/Text";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LinkButton } from "./ui/LinkButton";

gsap.registerPlugin(ScrollTrigger);

const IconBase = ({ children, className = "" }) => {
    return (
        <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            aria-hidden="true"
            focusable="false"
            className={className}
        >
            {children}
        </svg>
    );
};

const ScrollTextIcon = ({ className = "" }) => {
    return (
        <IconBase className={className}>
            <g transform="translate(-2.33 -2.329)">
                <path
                    d="M25.412 20.329H16.941"
                    stroke="currentColor"
                    strokeWidth="2.118"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M25.412 13.553H16.941"
                    stroke="currentColor"
                    strokeWidth="2.118"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M32.188 28.8V8.471A3.388 3.388 0 0 0 28.8 5.082H6.776"
                    stroke="currentColor"
                    strokeWidth="2.118"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M13.553 35.576H33.882A3.388 3.388 0 0 0 37.27 32.188V30.494A1.694 1.694 0 0 0 35.576 28.8H18.635A1.694 1.694 0 0 0 16.941 30.494V32.188A3.388 3.388 0 0 1 10.165 32.188V8.471A3.388 3.388 0 1 0 3.389 8.471V11.859A1.694 1.694 0 0 0 5.083 13.553H10.165"
                    stroke="currentColor"
                    strokeWidth="2.118"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </IconBase>
    );
};

const MessagesIcon = ({ className = "" }) => {
    return (
        <IconBase className={className}>
            <g transform="translate(-2.316 -2.328)">
                <path
                    d="M27.088 16.93A3.386 3.386 0 0 1 23.7 20.316H11.56A3.386 3.386 0 0 0 9.167 21.308L5.438 25.036A1.2 1.2 0 0 1 3.386 24.186V6.772A3.386 3.386 0 0 1 6.772 3.386H23.7A3.386 3.386 0 0 1 27.088 6.772Z"
                    stroke="currentColor"
                    strokeWidth="2.116"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M33.86 15.237A3.386 3.386 0 0 1 37.246 18.623V36.037A1.2 1.2 0 0 1 35.194 36.887L31.466 33.159A3.386 3.386 0 0 0 29.072 32.167H16.93A3.386 3.386 0 0 1 13.544 28.781V27.088"
                    stroke="currentColor"
                    strokeWidth="2.116"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </IconBase>
    );
};

const MapPinSearchIcon = ({ className = "" }) => {
    return (
        <IconBase className={className}>
            <g transform="translate(-3.975 -2.302)">
                <path
                    d="M20.5 36.77A1.674 1.674 0 0 1 19.079 36.485C15.966 33.8 6.695 25.094 6.695 16.737A13.39 13.39 0 1 1 33.475 16.737A12.354 12.354 0 0 1 33.288 18.849"
                    stroke="currentColor"
                    strokeWidth="2.092"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M36.822 36.822L33.675 33.675"
                    stroke="currentColor"
                    strokeWidth="2.092"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <circle
                    cx="20.085"
                    cy="16.737"
                    r="5.021"
                    stroke="currentColor"
                    strokeWidth="2.092"
                />

                <circle
                    cx="30.127"
                    cy="30.127"
                    r="5.021"
                    stroke="currentColor"
                    strokeWidth="2.092"
                />
            </g>
        </IconBase>
    );
};

const GoalIcon = ({ className = "" }) => {
    return (
        <IconBase className={className}>
            <g transform="translate(-2.304 -2.326)">
                <path
                    d="M20.3 22V3.384L33.836 10.152L20.3 16.921"
                    stroke="currentColor"
                    strokeWidth="2.115"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M34.79 17.3A15.228 15.228 0 1 1 13.555 8.345"
                    stroke="currentColor"
                    strokeWidth="2.115"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M13.54 16.915A8.46 8.46 0 1 0 28.6 20.333"
                    stroke="currentColor"
                    strokeWidth="2.115"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </IconBase>
    );
};

const NotebookPenIcon = ({ className = "" }) => {
    return (
        <IconBase className={className}>
            <g transform="translate(-2.171 -2.171)">
                <path
                    d="M22.524 3.362H10.085A3.362 3.362 0 0 0 6.724 6.724V33.618A3.362 3.362 0 0 0 10.086 36.98H30.256A3.362 3.362 0 0 0 33.618 33.618V21.18"
                    stroke="currentColor"
                    strokeWidth="2.101"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M3.362 10.085H10.086"
                    stroke="currentColor"
                    strokeWidth="2.101"
                    strokeLinecap="round"
                />

                <path
                    d="M3.362 16.809H10.086"
                    stroke="currentColor"
                    strokeWidth="2.101"
                    strokeLinecap="round"
                />

                <path
                    d="M3.362 23.533H10.086"
                    stroke="currentColor"
                    strokeWidth="2.101"
                    strokeLinecap="round"
                />

                <path
                    d="M3.362 30.256H10.086"
                    stroke="currentColor"
                    strokeWidth="2.101"
                    strokeLinecap="round"
                />

                <path
                    d="M35.935 9.457A3.571 3.571 0 0 0 30.886 4.408L22.465 12.833A3.362 3.362 0 0 0 21.614 14.269L20.207 19.093A.84.84 0 0 0 21.249 20.135L26.073 18.728A3.362 3.362 0 0 0 27.508 17.877Z"
                    stroke="currentColor"
                    strokeWidth="2.101"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </IconBase>
    );
};

const ScissorsIcon = ({ className = "" }) => {
    return (
        <IconBase className={className}>
            <g transform="translate(-2.33 -2.329)">
                <path
                    d="M9.182 15.959L13.553 20.33"
                    stroke="currentColor"
                    strokeWidth="2.118"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <circle
                    cx="6.776"
                    cy="13.553"
                    r="3.388"
                    stroke="currentColor"
                    strokeWidth="2.118"
                />

                <path
                    d="M23.718 10.165L9.182 24.7"
                    stroke="currentColor"
                    strokeWidth="2.118"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <circle
                    cx="6.776"
                    cy="27.106"
                    r="3.388"
                    stroke="currentColor"
                    strokeWidth="2.118"
                />

                <path
                    d="M18.3 25.073L23.721 30.494"
                    stroke="currentColor"
                    strokeWidth="2.118"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M27.106 20.329H23.718"
                    stroke="currentColor"
                    strokeWidth="2.118"
                    strokeLinecap="round"
                />

                <path
                    d="M37.271 20.329H33.882"
                    stroke="currentColor"
                    strokeWidth="2.118"
                    strokeLinecap="round"
                />
            </g>
        </IconBase>
    );
};

const HeartHandshakeIcon = ({ className = "" }) => {
    return (
        <IconBase className={className}>
            <path
                d="M32.89 24.419C35.577 21.732 37.271 19.482 37.271 16.094A9.318 9.318 0 0 0 21.022 9.867A1.016 1.016 0 0 1 19.636 9.867A9.318 9.318 0 0 0 3.388 16.094C3.388 19.994 5.929 22.87 8.47 25.412L17.848 34.5A3.388 3.388 0 0 0 22.725 34.588A3.592 3.592 0 0 0 22.718 29.506A3.6 3.6 0 1 0 27.8 24.419A3.6 3.6 0 0 0 32.89 24.419A3.388 3.388 0 0 0 32.89 19.628L29.7 16.44A4.083 4.083 0 0 0 23.925 16.44L21.022 19.34A3.388 3.388 0 1 1 16.231 14.549L21.013 9.87"
                transform="translate(-2.33 -3.105)"
                stroke="currentColor"
                strokeWidth="2.118"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </IconBase>
    );
};

const iconComponents = {
    scrollText: ScrollTextIcon,
    messages: MessagesIcon,
    mapPinSearch: MapPinSearchIcon,
    goal: GoalIcon,
    notebookPen: NotebookPenIcon,
    scissors: ScissorsIcon,
    heartHandshake: HeartHandshakeIcon,
};

export const HowItWorks = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const stepRefs = useRef([]);

    useEffect(() => {
        const context = gsap.context(() => {
            const steps = stepRefs.current.filter(Boolean);

            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            if (prefersReducedMotion) {
                gsap.set([headingRef.current, ...steps], {
                    y: 0,
                    opacity: 1,
                    scale: 1,
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
                    y: 25,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    ease: "power2.out",
                },
            );

            timeline.fromTo(
                steps,
                {
                    y: 24,
                    opacity: 0,
                    scale: 0.985,
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.55,
                    stagger: 0.09,
                    ease: "power2.out",
                },
                "-=0.3",
            );
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => context.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            aria-labelledby="how-it-works-title"
            className="bg-[#f7f7f7] py-20 sm:py-24 xl:py-32"
        >
            <LinkButton
                href={`${route("Home.index")}#orcamento`}
                className="flex gap-2 mx-auto mb-10 sm:-mt-10"
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

                <span>Quero abrir minha loja da Casa Brasileira</span>
            </LinkButton>
            <div className="container max-w-large">
                <Title
                    ref={headingRef}
                    id="how-it-works-title"
                    as="h2"
                    variant="display"
                    weight="thin"
                    className="text-center text-primary"
                >
                    Veja como funciona
                </Title>

                <ol className="mx-auto mt-14 max-w-[730px] space-y-3 sm:mt-16">
                    {steps.map((item, index) => {
                        const Icon = iconComponents[item.icon];

                        return (
                            <li
                                ref={(element) => {
                                    stepRefs.current[index] = element;
                                }}
                                key={item.id}
                                className="grid min-h-[72px] grid-cols-[92px_32px_1fr] items-center gap-4 rounded-full border border-[#e8ddd1] bg-white px-6 py-3 text-primary sm:grid-cols-[180px_36px_1fr] sm:gap-5 sm:px-11"
                            >
                                <Text
                                    as="span"
                                    variant="none"
                                    weight="semibold"
                                    className="text-base sm:text-xl"
                                >
                                    {item.step}
                                </Text>

                                <Icon className="h-8 w-8 sm:h-9 sm:w-9" />

                                <Text
                                    as="span"
                                    variant="none"
                                    weight="light"
                                    className="text-sm leading-tight sm:text-xl"
                                >
                                    {item.label}
                                </Text>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
};
