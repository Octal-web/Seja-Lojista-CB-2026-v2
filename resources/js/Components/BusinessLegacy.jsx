import { useEffect, useRef } from "react";

import { Text } from "./ui/Text";
import { Title } from "./ui/Title";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LinkButton } from "./ui/LinkButton";

import businessLegacy from "@/imgs/content/display/business-legacy.jpg";

gsap.registerPlugin(ScrollTrigger);

const legacyTags = [
    "Geram empregos",
    "Atendem milhares de clientes",
    "Criam patrimônio familiar",
    "Preparam sucessores",
];

export const BusinessLegacy = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const imageWrapperRef = useRef(null);
    const imageRef = useRef(null);
    const tagRefs = useRef([]);

    useEffect(() => {
        const context = gsap.context(() => {
            const tags = tagRefs.current.filter(Boolean);

            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            if (prefersReducedMotion) {
                gsap.set(
                    [
                        contentRef.current,
                        imageWrapperRef.current,
                        imageRef.current,
                        ...tags,
                    ],
                    {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        scale: 1,
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
                imageWrapperRef.current,
                {
                    x: -45,
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.85,
                    ease: "power2.out",
                },
            );

            timeline.fromTo(
                imageRef.current,
                {
                    scale: 1.08,
                },
                {
                    scale: 1,
                    duration: 1.15,
                    ease: "power2.out",
                },
                "<",
            );

            timeline.fromTo(
                contentRef.current,
                {
                    x: 45,
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                },
                "-=0.7",
            );

            timeline.fromTo(
                tags,
                {
                    y: 14,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.45,
                    stagger: 0.08,
                    ease: "power2.out",
                },
                "-=0.45",
            );
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => context.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            aria-labelledby="analise-investidor-regiao-titulo"
            className="relative"
        >
            <div className="relative grid max-lg:gap-10 grid-cols-1 lg:grid-cols-2">
                <div
                    ref={imageWrapperRef}
                    className="relative min-h-[500px] overflow-hidden md:min-h-[720px] 2xl:min-h-[770px]"
                >
                    <img
                        ref={imageRef}
                        src={businessLegacy}
                        alt="Equipe de profissionais reunida em um ambiente planejado"
                        width="1200"
                        height="1200"
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover will-change-transform"
                        style={{
                            objectPosition: "center top",
                        }}
                    />
                </div>

                <div
                    ref={contentRef}
                    className="lg:max-w-[51.98rem] pr-[5%] sm:pr-[10%] h-full flex items-center"
                >
                    <div className="ml-5 sm:ml-12 lg:pt-10 2xl:pt-0">
                        <Title
                            id="analise-investidor-regiao-titulo"
                            as="h2"
                            variant="section"
                            weight="light"
                            className="mb-5 md:mb-10 text-primary !leading-tight"
                        >
                            Cada operação é avaliada
                            <span className="ml-2 2xl:ml-0 2xl:block">
                                de acordo com a região,
                            </span>
                            <span className="ml-2 2xl:ml-0 2xl:block">
                                o ponto e o perfil do investidor
                            </span>
                        </Title>

                        <Text
                            as="p"
                            variant="none"
                            weight="light"
                            className="text-sm xl:max-w-[638px] leading-relaxed sm:text-base"
                        >
                            O investimento para abrir uma loja pode variar
                            conforme a cidade, o tamanho da loja (showroom), o
                            ponto comercial, o projeto da loja, a estrutura da
                            equipe e o potencial de mercado da região.
                        </Text>

                        <Text
                            as="p"
                            variant="none"
                            weight="light"
                            className="mt-4 lg:mt-8 xl:max-w-[647px] text-sm leading-[1.75] sm:text-base"
                        >
                            Por isso, a Casa Brasileira conduz uma análise
                            individual com cada interessado. Após o cadastro, a
                            equipe de expansão avalia as informações iniciais e
                            apresenta orientações mais precisas sobre o modelo,
                            as etapas de implantação e os critérios necessários
                            para avançar no processo.
                        </Text>

                        <LinkButton
                            href={`${route("Home.index")}#orcamento`}
                            className="flex gap-2 truncate mx-auto sm:mx-0 mt-12 mb-10"
                        >
                            Quero receber uma análise para minha região
                        </LinkButton>
                    </div>
                </div>
            </div>
        </section>
    );
};
