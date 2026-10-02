import { useEffect, useRef } from "react";

import { StoreFirstForm } from "@/Components/StoreFirstForm";
import { Text } from "@/Components/ui/Text";
import { Title } from "@/Components/ui/Title";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useMediaQuery } from "@/Hooks/useMediaQuery";
import bannerMobile from "@/imgs/content/display/main-bg-mobile.jpg";
import banner from "@/imgs/content/display/main-bg.jpg";

gsap.registerPlugin(ScrollTrigger);


export const HeroBanner = () => {
    const sectionRef = useRef(null);
    const heroImageRef = useRef(null);
    const heroContentRef = useRef(null);
    const heroQuoteRefs = useRef([]);

    const heroQuote = [
        <span className="font-thin">Seja um lojista <span className="font-bold whitespace-nowrap">Casa Brasileira</span>.</span>,
    ];

    useEffect(() => {
        const context = gsap.context(() => {
            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            if (prefersReducedMotion) {
                gsap.set(
                    [
                        heroImageRef.current,
                        heroContentRef.current,
                        ...heroQuoteRefs.current.filter(Boolean),
                    ],
                    {
                        y: 0,
                        yPercent: 0,
                        opacity: 1,
                    },
                );

                return;
            }

            gsap.fromTo(
                heroImageRef.current,
                {
                    objectPosition: "50% 50%",
                },
                {
                    objectPosition: "50% -40%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "-15% top",
                        end: "bottom top",
                        scrub: true,
                    },
                },
            );

            heroQuoteRefs.current.filter(Boolean).forEach((element, index) => {
                gsap.fromTo(
                    element,
                    {
                        yPercent: 110,
                    },
                    {
                        yPercent: 0,
                        duration: 0.8,
                        delay: index * 0.1,
                        ease: "power2.out",
                    },
                );
            });

            gsap.fromTo(
                heroContentRef.current,
                {
                    y: 24,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    delay: 0.55,
                    ease: "power2.out",
                },
            );
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => context.revert();
    }, []);

    const src = useMediaQuery("(min-width: 640px)") ? banner : bannerMobile;

    return (
        <section
            ref={sectionRef}
            aria-labelledby="hero-title"
            className="relative z-[1] bg-primary min-h-[620px]"
        >
            <img
                ref={heroImageRef}
                src={src}
                alt=""
                width="1920"
                height="1080"
                loading="eager"
                fetchpriority="high"
                decoding="async"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover object-[62%_center] will-change-transform sm:object-center"
            />

            <div className="absolute inset-0 bg-[linear-gradient(45deg,_rgba(0,0,0,.7)_20%,_transparent_45%)]" />

            <div className="absolute inset-0 bg-gradient-to-tr from-black from-60% to-80% md:from-50% to-transparent md:to-60% opacity-40" />

            <div className="container relative max-w-large">
                <div className="flex min-h-[calc(95vh-80px)] sm:min-h-[calc(85vh-80px)] flex-col justify-end gap-10 pb-10 pt-24 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:py-36">
                    <div className="w-full md:max-w-[650px] lg:max-w-[500px] 2xl:max-w-[650px]">
                        <Title
                            id="hero-title"
                            as="h1"
                            variant="hero"
                            weight="normal"
                            className="mb-5 !text-white"
                        >
                            {heroQuote.map((quote, index) => (
                                <span
                                    key={index}
                                    className="mr-1.5 md:mr-0 md:block overflow-hidden 2xl:pb-1"
                                >
                                    <span
                                        ref={(element) => {
                                            heroQuoteRefs.current[index] =
                                                element;
                                        }}
                                        className="md:block 2xl:pb-1 leading-[1.2]"
                                    >
                                        {quote}
                                    </span>
                                </span>
                            ))}
                        </Title>

                        <div ref={heroContentRef}>
                            <Title
                                as="h2"
                                variant="heroSupport"
                                weight="bold"
                                className="mb-2 2xl:mb-5 md:max-w-[780px] text-balance !text-secondary max-sm:text-sm"
                            >
                                Abra sua própria loja de móveis planejados e leve uma marca nacional, com a essência do Brasil, para a sua região.
                            </Title>
                        </div>
                    </div>

                    <div className="w-full lg:max-w-[540px] lg:shrink-0 xl:max-w-[580px]">
                        <StoreFirstForm />
                    </div>
                </div>
            </div>
        </section>
    );
};
