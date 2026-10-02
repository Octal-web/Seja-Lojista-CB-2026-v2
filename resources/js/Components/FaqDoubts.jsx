import { useEffect, useRef } from "react";

import { faqDoubts } from "@/Data/faqDoubts";

import { Doubt } from "./Doubt";
import { Title } from "./ui/Title";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const FaqDoubts = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const itemRefs = useRef([]);

    useEffect(() => {
        const context = gsap.context(() => {
            const items = itemRefs.current.filter(Boolean);

            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            if (prefersReducedMotion) {
                gsap.set([titleRef.current, ...items], {
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
                titleRef.current,
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
                items,
                {
                    y: 22,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.08,
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
            aria-labelledby="faq-title"
            className="bg-[#F7F3ED] pt-20 sm:pt-24 xl:pt-28 2xl:pt-32 pb-28 sm:pb-40 xl:pb-52 2xl:pb-64"
        >
            <div className="container max-w-medium">
                <Title
                    ref={titleRef}
                    id="faq-title"
                    as="h2"
                    variant="section"
                    weight="bold"
                    className="text-center text-primary"
                >
                    FAQ
                </Title>

                <div
                    role="list"
                    className="mx-auto mt-14 max-w-[900px] space-y-4 sm:mt-16"
                >
                    {faqDoubts.map((doubt, index) => (
                        <div
                            ref={(element) => {
                                itemRefs.current[index] = element;
                            }}
                            key={doubt.id}
                            role="listitem"
                        >
                            <Doubt index={index} doubt={doubt} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
