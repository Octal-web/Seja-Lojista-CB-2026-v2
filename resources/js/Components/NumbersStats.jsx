import React, { useEffect, useRef } from 'react';

import { stats } from '@/Data/stats';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const NumbersStats = () => {
    const sectionRef = useRef(null);
    const cardRefs = useRef([]);
    const numberRefs = useRef([]);

    useEffect(() => {
        const context = gsap.context(() => {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            if (prefersReducedMotion) {
                numberRefs.current.forEach((element, index) => {
                    if (!element) return;

                    const item = stats[index];

                    element.textContent = `${item.prefix}${item.value}${item.suffix}`;
                });

                return;
            }

            gsap.fromTo(cardRefs.current.filter(Boolean), {
                y: 40,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 0.4,
                stagger: 0.14,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 65%',
                    once: true,
                },
            });

            numberRefs.current.forEach((element, index) => {
                if (!element) return;

                const item = stats[index];
                const counter = { value: 0 };

                gsap.to(counter, {
                    value: item.value,
                    duration: 1.8,
                    delay: index * 0.12,
                    ease: 'power2.out',
                    snap: {
                        value: 1,
                    },
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        once: true,
                    },
                    onUpdate: () => {
                        const currentValue = Math.round(counter.value);

                        element.textContent = `${item.prefix}${currentValue}${item.suffix}`;
                    },
                });
            });
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => context.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden bg-secondary py-14 lg:py-24 xl:py-32 2xl:py-48">
            <div className="absolute inset-x-0 top-0 hidden h-[44%] bg-white lg:block" />

            <div className="container max-w-large">
                <div className="grid grid-cols-1 gap-3 lg:gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8">
                    {stats.map((item, index) => (
                        <article ref={(element) => { cardRefs.current[index] = element; }} key={`${item.value}-${item.suffix}-${index}`} className="flex min-h-[140px] flex-col items-center justify-center rounded-[30px] border border-secondary bg-white px-3 md:px-6 py-5 md:py-10 text-center text-primary inktrap sm:min-h-[200px] 2xl:min-h-[370px]">
                            <span className="mb-3.5 md:mb-7 text-base sm:text-xl 2xl:text-2xl font-light leading-none">{item.label}</span>

                            <strong ref={(element) => { numberRefs.current[index] = element; }} className="mb-3.5 md:mb-7 block min-w-[2ch] font-light leading-[0.8] tracking-[-0.06em] text-[60px] sm:text-[70px] xl:text-[120px]">
                                0{item.suffix}
                            </strong>

                            <p className="font-light leading-[1.25] text-base sm:text-xl 2xl:text-2xl">
                                {item.description.map((line, lineIndex) => (
                                    <React.Fragment key={line}>
                                        {line}
                                        {lineIndex < item.description.length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};