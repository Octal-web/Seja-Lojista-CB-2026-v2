import React, { useEffect, useRef } from 'react';

import { homeInfos } from '@/Data/homeInfos';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CheckIcon = () => {
    return (
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true" focusable="false" className="mt-0.5 shrink-0">
            <path d="M15.776 7.434a7.585 7.585 0 1 1-3.641-5.055" stroke="currentColor" strokeWidth="1.517" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.307 6.829l2.276 2.276 7.585-7.585" stroke="currentColor" strokeWidth="1.517" strokeLinecap="round" strokeLinejoin="round" transform="translate(1.3 1.4)" />
        </svg>
    );
};

export const HomeInfos = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const highlightRef = useRef(null);
    const cardRefs = useRef([]);

    const cardVariants = {
        primary: 'bg-primary text-white',
        light: 'bg-[#ECE5DB] text-primary',
        secondary: 'bg-secondary text-primary',
    };

    useEffect(() => {
        const context = gsap.context(() => {
            const cards = cardRefs.current.filter(Boolean);
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            if (prefersReducedMotion) {
                gsap.set([headingRef.current, highlightRef.current, ...cards], { y: 0, opacity: 1 });

                return;
            }

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    once: true,
                },
            });

            timeline.fromTo(headingRef.current, {
                y: 25,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: 'power2.out',
            });

            timeline.fromTo(highlightRef.current, {
                y: 20,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out',
            }, '-=0.35');

            timeline.fromTo(cards, {
                y: 20,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.14,
                ease: 'power2.out',
            }, '-=0.25');
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => context.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden bg-white">
            <div className="bg-secondary pb-16 md:pb-28 lg:pb-32 md:pt-10 xl:pb-30 2xl:pt-12">
                <div className="container max-w-large">
                    <h2 ref={headingRef} className="mx-auto max-w-4xl text-center text-4xl font-thin tracking-tight text-primary sm:text-5xl xl:text-6xl">
                        {homeInfos.title.map((line) => (
                            <span key={line} className="block">{line}</span>
                        ))}
                    </h2>
                </div>
            </div>

            <div className="container max-w-large">
                <div ref={highlightRef} className="-mt-8 mx-auto flex min-h-16 max-w-2xl items-center justify-center rounded-full border border-primary bg-white px-4 md:px-8 py-3 text-center text-sm md:text-base lg:text-xl font-light text-primary xl:text-2xl">
                    {homeInfos.highlight}
                </div>

                <div className="grid grid-cols-1 gap-6 py-14 sm:py-24 lg:grid-cols-3 lg:gap-7 2xl:py-28">
                    {homeInfos.cards.map((card, index) => (
                        <article ref={(element) => { cardRefs.current[index] = element; }} key={card.title} className={`flex min-h-[225px] flex-col rounded-[26px] px-8 py-8 md:px-9 ${cardVariants[card.variant]}`}>
                            <h3 className="mb-7 text-xl font-light leading-[1.2] sm:text-2xl text-balance">{card.title}</h3>

                            <ul className="mt-auto space-y-1.5 text-xs sm:text-sm font-light md:text-base">
                                {card.items.map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                        <CheckIcon />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};