import { supportStructureData } from "@/Data/supportStructureData";
import { LinkButton } from "./ui/LinkButton";
import { Text } from "./ui/Text";
import { Title } from "./ui/Title";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const SupportStructure = () => {
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

            tl.from(".content-item", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
            }).from(
                ".cards",
                {
                    opacity: 0,
                    scale: 0.8,
                    stagger: 0.2,
                    duration: 1,
                    ease: "power3.out",
                },
                "-=0.5",
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);
    return (
        <section
            ref={sectionRef}
            id="suporte"
            aria-labelledby="suporte-estrutura-titulo"
            className="bg-[#F7F3ED] py-20 sm:pt-24 xl:pt-28 2xl:pt-36 2xl:pb-30"
        >
            <div className="container max-w-large flex flex-col items-center text-center">
                <Title
                    id="suporte-estrutura-titulo"
                    variant="none"
                    weight="thin"
                    className="mt-10 text-[30px] leading-[1.3] tracking-[-0.035em] text-primary sm:text-[42px] 2xl:text-[45px] content-item"
                >
                    Suporte para estruturar a loja e desenvolver a
                    <span className="ml-2 lg:ml-0 lg:block content-item">
                        operação comercial
                    </span>
                </Title>

                <Text className="max-w-[970px] pt-7 lg:pt-10 content-item">
                    O acompanhamento pode envolver treinamentos, orientação
                    comercial, apoio de marketing, diretrizes de posicionamento,
                    materiais institucionais e suporte para fortalecer a
                    presença da loja na região.
                </Text>

                <ul className="grid sm:grid-cols-2 gap-4 mt-10 lg:mt-14">
                    {supportStructureData.map((item) => (
                        <li
                            key={item.title}
                            className="bg-white text-start px-6 2xl:px-9 py-8 rounded-2xl border border-[#707070] cards"
                        >
                            <Text variant="lead" role="heading" aria-level="3">
                                {item.title}
                            </Text>

                            <Text className="mt-2">{item.text}</Text>
                        </li>
                    ))}
                </ul>

                <LinkButton
                    href={`${route("Home.index")}#orcamento`}
                    className="flex gap-2 truncate mx-auto mt-10 xl:mt-16 justify-center"
                >
                    Quero abrir minha loja
                </LinkButton>
            </div>
        </section>
    );
};
