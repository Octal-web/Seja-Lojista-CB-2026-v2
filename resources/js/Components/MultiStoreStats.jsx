import React, { useEffect, useRef } from 'react';

import { multiStoreStats } from '@/Data/multiStoreStats';

import { Title } from './ui/Title';
import { Text } from './ui/Text';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const formatStatValue = (item, value) => {
    const formattedValue = String(Math.round(value)).padStart(
        item.minimumDigits ?? 1,
        '0'
    );

    return `${item.prefix ?? ''}${formattedValue}${item.suffix ?? ''}`;
};

export const MultiStoreStats = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const highlightRef = useRef(null);
    const cardRefs = useRef([]);
    const numberRefs = useRef([]);

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
                        highlightRef.current,
                        ...cards,
                    ],
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                    }
                );

                numberRefs.current.forEach((element, index) => {
                    if (!element) return;

                    element.textContent = formatStatValue(
                        multiStoreStats[index],
                        multiStoreStats[index].value
                    );
                });

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
                highlightRef.current,
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
                '-=0.4'
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
                    duration: 0.6,
                    stagger: 0.12,
                    ease: 'power2.out',
                },
                '-=0.25'
            );

            numberRefs.current.forEach((element, index) => {
                if (!element) return;

                const item = multiStoreStats[index];
                const counter = {
                    value: 0,
                };

                gsap.to(counter, {
                    value: item.value,
                    duration: 1.8,
                    delay: 0.45 + index * 0.12,
                    ease: 'power2.out',
                    snap: {
                        value: 1,
                    },
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 72%',
                        once: true,
                    },
                    onUpdate: () => {
                        element.textContent = formatStatValue(
                            item,
                            counter.value
                        );
                    },
                });
            });
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => context.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            aria-labelledby="multi-store-stats-title"
            className="overflow-hidden bg-white py-20 sm:py-24 xl:pt-32 2xl:pt-40"
        >
            <div className="container max-w-large">
                <Title
                    ref={headingRef}
                    id="multi-store-stats-title"
                    as="h2"
                    variant="display"
                    weight="thin"
                    className="mx-auto max-w-[780px] text-center text-primary"
                >
                    Muitos começaram com
                    <span className="block">
                        uma unidade
                    </span>
                </Title>

                <div
                    ref={highlightRef}
                    className="mx-auto mt-8 flex min-h-[56px] w-fit min-w-[320px] items-center justify-center rounded-full border border-primary px-8 py-3 text-center sm:min-w-[390px]"
                >
                    <Text
                        as="p"
                        variant="none"
                        weight="light"
                        className="text-base sm:text-lg text-primary md:text-2xl"
                    >
                        Hoje operam múltiplas lojas
                    </Text>
                </div>

                <div className="mt-20 grid grid-cols-1 gap-3 sm:gap-6 sm:mt-24 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
                    {multiStoreStats.map((item, index) => (
                        <article
                            ref={(element) => {
                                cardRefs.current[index] = element;
                            }}
                            key={item.id}
                            className="flex min-h-[150px] flex-col items-center justify-center rounded-[26px] bg-secondary px-6 py-5 md:py-10 text-center text-primary sm:min-h-[200px] 2xl:min-h-[285px]"
                        >
                            <Title
                                ref={(element) => {
                                    numberRefs.current[index] = element;
                                }}
                                as="strong"
                                variant="number"
                                weight="light"
                                className="mb-3.5 md:mb-7 block min-w-[2ch]"
                            >
                                {formatStatValue(item, 0)}
                            </Title>

                            <div>
                                {item.description.map((line) => (
                                    <Text
                                        key={line.text}
                                        as="span"
                                        variant="none"
                                        weight={line.weight}
                                        className="block text-lg leading-[1.25] sm:text-xl"
                                    >
                                        {line.text}
                                    </Text>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};