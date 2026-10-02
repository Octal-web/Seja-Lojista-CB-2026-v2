import { brandAdvantagens } from "@/Data/brandAdvantages";
import { LinkButton } from "./ui/LinkButton";
import { Text } from "./ui/Text";
import { Title } from "./ui/Title";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const BrandAdvantages = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });

            tl.from(".tag", {
                scale: 0,
                stagger: 0.15,
                duration: 1,
                ease: "back.out(2)",
            })
                .from(
                    ".content-item",
                    {
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out",
                    },
                    "-=0.5",
                )
                .from(
                    ".cards",
                    {
                        opacity: 0,
                        scale: 0.8,
                        stagger: 0.15,
                        duration: 1,
                        ease: "back.out(2)",
                    },
                    "-=0.5",
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);
    return (
        <section
            ref={sectionRef}
            id="casaBrasileira"
            aria-labelledby="vantagens-casa-brasileira-titulo"
            className="container max-w-large pt-20 xl:pt-28 2xl:pt-36"
        >
            <div className="text-center flex flex-col items-center">
                <Text className="border border-primary rounded-full w-fit px-5 py-2 tag">
                    Por que escolher a <span className="whitespace-nowrap">Casa Brasileira?</span>
                </Text>

                <Title
                    id="vantagens-casa-brasileira-titulo"
                    variant="none"
                    weight="thin"
                    className="mt-6 text-[30px] leading-[1.3] tracking-[-0.035em] text-primary sm:text-[42px] 2xl:text-[45px] content-item"
                >
                    Estrutura, presença e suporte para quem quer
                    <span className="ml-2 lg:ml-0 lg:block content-item">
                        empreender com a <span className="whitespace-nowrap">Casa Brasileira</span>
                    </span>
                </Title>

                <Text className="max-w-[1170px] pt-7 lg:pt-10 content-item">
                    A Casa Brasileira é voltada para quem deseja atuar no setor
                    de móveis planejados com mais segurança, posicionamento e
                    visão de longo prazo. A marca combina estrutura industrial
                    própria, suporte especializado, produto competitivo e um
                    modelo de operação pensado para quem deseja construir um
                    negócio sólido.
                </Text>

                <ul className="flex flex-wrap justify-center gap-3.5 md:gap-7 mt-10 lg:mt-20">
                    {brandAdvantagens.map((brand, index) => (
                        <li
                            key={index}
                            className="bg-[#F7F3ED] border border-[#707070] rounded-[18px] p-5 xl:p-7 2xl:py-11 sm:w-[330px] lg:w-[380px] 2xl:w-[475px] md:h-auto text-start cards"
                        >
                            <Text variant="lead" role="heading" aria-level="3">
                                {brand.title.map((line) => (
                                    <span
                                        key={line}
                                        className="mr-2 xl:mr-0 xl:block"
                                    >
                                        {line}
                                    </span>
                                ))}
                            </Text>

                            <Text variant="bodySmall" className="mt-5 2xl:mt-10">{brand.text}</Text>
                        </li>
                    ))}
                </ul>

                <LinkButton
                    href={`${route("Home.index")}#orcamento`}
                    className="flex gap-2 truncate mx-auto mt-10 xl:mt-16 justify-center"
                >
                    Quero saber mais
                </LinkButton>
            </div>
        </section>
    );
};
