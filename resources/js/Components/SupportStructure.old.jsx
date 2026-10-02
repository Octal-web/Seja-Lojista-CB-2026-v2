import React, { useEffect, useRef } from 'react';

import { supportStructureData } from '@/Data/supportStructureData';
import { Text } from '@/Components/ui/Text';
import { Title } from '@/Components/ui/Title';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SupportStructure = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const descriptionRef = useRef(null);
    const rowRefs = useRef([]);
    const supportTitleRef = useRef(null);
    const supportItemRefs = useRef([]);

    useEffect(() => {
        const context = gsap.context(() => {
            const rows = rowRefs.current.filter(Boolean);
            const supportItems = supportItemRefs.current.filter(Boolean);
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            if (prefersReducedMotion) {
                gsap.set([headingRef.current, descriptionRef.current, supportTitleRef.current, ...rows, ...supportItems], { y: 0, opacity: 1 });

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

            timeline.fromTo(descriptionRef.current, {
                y: 18,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out',
            }, '-=0.4');

            timeline.fromTo(rows, {
                y: 20,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 0.65,
                stagger: 0.1,
                ease: 'power2.out',
            }, '-=0.25');

            timeline.fromTo(supportTitleRef.current, {
                y: 15,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out',
            }, '-=0.2');

            timeline.fromTo(supportItems, {
                y: 15,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 0.55,
                stagger: 0.1,
                ease: 'power2.out',
            }, '-=0.25');
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => context.revert();
    }, []);

    return (
        <section ref={sectionRef} id="suporte" aria-labelledby="support-structure-title" className="relative rounded-[55px] bg-primary pb-20 pt-14 text-white md:py-24 2xl:pb-32 2xl:pt-52">
            <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-[#f5f5f5] -z-[1]" />
            <div className="container max-w-large">
                <div className="mb-8 sm:mb-16 md:mb-20">
                    <Title
                        ref={headingRef}
                        as="h2"
                        id="support-structure-title"
                        variant="display"
                    >
                        <span>{supportStructureData.heading.beforeHighlight} </span>
                        <span className="text-secondary">{supportStructureData.heading.highlight}</span>
                    </Title>

                    <Text
                        ref={descriptionRef}
                        variant="bodySmall"
                        className="mt-5 max-w-[630px] text-white/80"
                    >
                        {supportStructureData.description}
                    </Text>
                </div>

                <div>
                    {supportStructureData.benefits.map((benefit, index) => (
                        <article
                            ref={(element) => { rowRefs.current[index] = element; }}
                            key={benefit.title}
                            className="grid gap-4 border-b border-white/20 py-4 2xl:py-8 first:pt-0 md:grid-cols-[280px_1fr] md:gap-16 lg:grid-cols-[320px_1fr] xl:gap-24"
                        >
                            <Title as="h3" variant="card" weight="medium" className="text-secondary">
                                {benefit.title}
                            </Title>

                            <Text variant="body" className="max-w-[760px] text-white/90">
                                {benefit.description}
                            </Text>
                        </article>
                    ))}
                </div>

                <div className="pt-8 md:pt-16 2xl:pt-20">
                    <Title
                        ref={supportTitleRef}
                        as="h3"
                        variant="subsection"
                        className="mb-3.5 2xl:mb-7 text-white"
                    >
                        {supportStructureData.continuousSupport.title}
                    </Title>

                    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
                        {supportStructureData.continuousSupport.items.map((item, index) => (
                            <li
                                ref={(element) => { supportItemRefs.current[index] = element; }}
                                key={item}
                                className="flex min-h-[54px] items-center justify-center rounded-full bg-secondary px-6 py-3 text-center text-primary lg:-ml-px lg:first:ml-0"
                            >
                                <Text as="span" variant="bodySmall" weight="medium">
                                    {item}
                                </Text>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};