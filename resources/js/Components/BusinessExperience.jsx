import React, { useEffect, useRef } from "react";

import { Title } from "./ui/Title";
import { Text } from "./ui/Text";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import businessExperience from "@/imgs/content/display/business-experience.jpg";
import check from "@/imgs/content/display/check.png";

gsap.registerPlugin(ScrollTrigger);

const accessList = [
    "Implantação estruturada da loja",
    "Treinamento comercial e operacional",
    "Consultoria especializada",
    "Apoio em marketing e geração de demanda",
    "Ferramentas de gestão e vendas",
    "Acompanhamento contínuo da operação",
];

export const BusinessExperience = () => {
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
                contentRef.current,
                {
                    x: -45,
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                },
            );

            timeline.fromTo(
                imageWrapperRef.current,
                {
                    x: 45,
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.85,
                    ease: "power2.out",
                },
                "-=0.6",
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
        <section ref={sectionRef} aria-labelledby="experiencia-mercado-moveis-titulo" className="pt-20 md:pt-36 xl:pt-52 2xl:pt-64">
            <div className="relative grid max-lg:gap-10 grid-cols-1 lg:grid-cols-2">
                <div
                    ref={contentRef}
                    className="w-full lg:max-w-[51.98rem] pl-[5%] lg:pl-[10%] ml-auto h-full flex items-center"
                >
                    <div className="mr-6 md:mr-12">
                        <Title
                            id="experiencia-mercado-moveis-titulo"
                            as="h2"
                            variant="section"
                            weight="light"
                            className="mb-5 md:mb-10 text-primary !leading-tight"
                        >
                            Você não precisa conhecer
                            <span className="ml-2 2xl:ml-0 2xl:block">o mercado de móveis</span>
                            <span className="ml-2 2xl:ml-0 2xl:block">
                                planejados para começar
                            </span>
                        </Title>

                        <Text
                            as="p"
                            variant="none"
                            weight="light"
                            className="text-sm xl:max-w-[638px] leading-relaxed sm:text-base"
                        >
                            Para abrir uma loja, não é
                            necessário já atuar no setor moveleiro, nem ter
                            experiência prévia em arquitetura, reforma ou
                            decoração. O perfil ideal é de um empreendedor com
                            visão de negócio, capacidade de gestão e interesse
                            em ter uma loja com reconhecimento estabelecido no
                            mercado.
                        </Text>

                        <Text
                            as="p"
                            variant="none"
                            weight="light"
                            className="mt-4 lg:mt-8 xl:max-w-[647px] text-sm leading-[1.75] sm:text-base"
                        >
                            Desde o início, o novo lojista conta com
                            treinamentos, orientação da equipe especializada e
                            suporte durante a implantação da loja e após o
                            início da operação. A proposta é criar um ambiente
                            em que o empreendedor possa aprender, se desenvolver
                            e conduzir sua loja com mais preparo e segurança.
                        </Text>

                        <Title
                            weight="bold"
                            variant="metric"
                            className="pt-10 lg:pt-16 pb-1"
                        >
                            Você terá acesso a:
                        </Title>

                        {accessList.map((access) => (
                            <div
                                key={access}
                                className="flex items-center gap-3 mt-3 last:md:pb-10 last:2xl:pb-20"
                            >
                                <img
                                    src={check}
                                    alt=""
                                    aria-hidden="true"
                                    className="size-5 mt-0.5 shrink-0"
                                    loading="lazy"
                                />

                                <Text className="text-sm 2xl:text-base">
                                    {access}
                                </Text>
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    ref={imageWrapperRef}
                    className="relative min-h-[500px] overflow-hidden md:min-h-[720px] 2xl:min-h-[770px]"
                >
                    <img
                        ref={imageRef}
                        src={businessExperience}
                        alt="Cozinha planejada em uma loja Casa Brasileira"
                        width="1200"
                        height="1200"
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover will-change-transform"
                        style={{
                            objectPosition: "center",
                        }}
                    />
                </div>
            </div>
        </section>
    );
};