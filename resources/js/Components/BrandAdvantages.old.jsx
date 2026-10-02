import React, { useEffect, useRef } from 'react';

import { brandAdvantages } from '@/Data/brandAdvantages';

import { Title } from './ui/Title';
import { Text } from './ui/Text';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import logo from '@/imgs/site/img/logo-main.png'

gsap.registerPlugin(ScrollTrigger);

const CheckIcon = ({ className = '' }) => {
    return (
        <svg
            width="38"
            height="38"
            viewBox="0 0 37.577 38.09"
            fill="none"
            aria-hidden="true"
            focusable="false"
            className={className}
        >
            <g transform="translate(2.18 1.796)">
                <path
                    d="M34.433,15.492A17.686,17.686,0,0,1,24.81,34.977,16.152,16.152,0,0,1,4.654,29.186,18.148,18.148,0,0,1,5.81,7.268,16.057,16.057,0,0,1,26.451,3.852"
                    transform="translate(-1.519 -1.514)"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M6.826,15.259,11.813,20.5,28.438,3.034"
                    transform="translate(4.807 0.465)"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    );
};

export const BrandAdvantages = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const brandRef = useRef(null);
    const rowRefs = useRef([]);

    useEffect(() => {
        const context = gsap.context(() => {
            const rows = rowRefs.current.filter(Boolean);

            const prefersReducedMotion = window.matchMedia(
                '(prefers-reduced-motion: reduce)'
            ).matches;

            if (prefersReducedMotion) {
                gsap.set(
                    [
                        headingRef.current,
                        brandRef.current,
                        ...rows,
                    ],
                    {
                        x: 0,
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
                    x: -35,
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.75,
                    ease: 'power2.out',
                }
            );

            timeline.fromTo(
                brandRef.current,
                {
                    y: 25,
                    opacity: 0,
                    scale: 0.96,
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.75,
                    ease: 'power2.out',
                },
                '-=0.5'
            );

            timeline.fromTo(
                rows,
                {
                    y: 20,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.09,
                    ease: 'power2.out',
                },
                '-=0.35'
            );
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => context.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            aria-labelledby="why-casa-brasileira-title"
            className="overflow-hidden bg-[#f7f7f7] py-20 sm:py-24 xl:py-32 2xl:py-40"
            id="casaBrasileira"
        >
            <div className="container max-w-medium">
                <div className="mx-auto max-w-[760px]">
                    <div className="grid grid-cols-[minmax(0,1fr)_125px] items-stretch sm:grid-cols-[minmax(0,1fr)_180px] lg:grid-cols-[minmax(0,1fr)_212px]">
                        <div
                            ref={headingRef}
                            className="flex items-center pb-10 pr-6 opacity-0 sm:pb-12 sm:pr-10"
                        >
                            <Title
                                id="why-casa-brasileira-title"
                                as="h2"
                                variant="none"
                                weight="light"
                                className="text-3xl leading-[1.1] text-primary sm:text-4xl"
                            >
                                Por que

                                <span className="block font-bold">
                                    Casa Brasileira?
                                </span>
                            </Title>
                        </div>

                        <div
                            ref={brandRef}
                            className="flex min-h-[180px] items-center justify-center rounded-t-[34px] bg-secondary px-4 opacity-0 sm:min-h-[200px] sm:rounded-t-[42px]"
                        >
                            <img
                                src={logo}
                                alt="Casa Brasileira"
                                width="104"
                                height="94"
                                loading="lazy"
                                decoding="async"
                                className="h-auto w-[78px] object-contain sm:w-[104px]"
                            />
                        </div>
                    </div>

                    <ul aria-label="Diferenciais da Casa Brasileira">
                        {brandAdvantages.map((item, index) => {
                            const isLast =
                                index === brandAdvantages.length - 1;

                            return (
                                <li
                                    ref={(element) => {
                                        rowRefs.current[index] = element;
                                    }}
                                    key={item.id}
                                    className="grid grid-cols-[minmax(0,1fr)_125px] opacity-0 sm:grid-cols-[minmax(0,1fr)_180px] lg:grid-cols-[minmax(0,1fr)_212px]"
                                >
                                    <div className="flex min-h-[78px] items-center border-t border-[#e7ded2] pr-5 sm:min-h-[82px] sm:pr-10">
                                        <Text
                                            as="span"
                                            variant="none"
                                            weight="light"
                                            className="text-base sm:text-lg leading-tight text-primary md:text-xl lg:text-2xl"
                                        >
                                            {item.label}
                                        </Text>
                                    </div>

                                    <div
                                        className={[
                                            'flex min-h-[78px] items-center justify-center border-t border-white/70 bg-secondary text-primary sm:min-h-[82px]',
                                            isLast
                                                ? 'rounded-b-[34px] sm:rounded-b-[42px]'
                                                : '',
                                        ].join(' ')}
                                    >
                                        <CheckIcon className="h-8 w-8 sm:h-[38px] sm:w-[38px]" />
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
};