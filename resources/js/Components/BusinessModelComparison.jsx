import { businessModels } from "@/Data/businessModels";
import { LinkButton } from "./ui/LinkButton";
import { Text } from "./ui/Text";
import { Title } from "./ui/Title";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const BusinessModelComparison = () => {
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
                    ".card-left",
                    {
                        opacity: 0,
                        x: -100,
                        duration: 0.5,
                        ease: "power1.out",
                    },
                    "-=0.9",
                )
                .from(
                    ".card-right",
                    {
                        opacity: 0,
                        x: 100,
                        duration: 0.5,
                        ease: "power1.out",
                    },
                    "-=0.9",
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);
    return (
        <section
            ref={sectionRef}
            id="modelo"
            aria-labelledby="modelo-loja-propria-titulo"
            className="bg-primary py-20 sm:pt-24 xl:pt-28 2xl:pt-30 2xl:pb-24"
        >
            <div className="container max-w-large flex flex-col items-center text-center">
                <Text className="border bg-white border-primary rounded-full w-fit px-5 py-2 tag">
                    Loja própria ou franquia: entenda a diferença
                </Text>

                <Title
                    id="modelo-loja-propria-titulo"
                    variant="none"
                    weight="thin"
                    className="mt-10 lg:mt-14 text-[30px] leading-[1.3] tracking-[-0.035em] !text-white sm:text-[42px] 2xl:text-[45px] content-item"
                >
                    <span className="text-secondary font-bold">
                        Não é franquia.
                    </span>{" "}
                    É uma operação de loja própria com
                    <span className="ml-2 xl:ml-0 xl:block content-item">
                        suporte de uma marca nacional.
                    </span>
                </Title>

                <div className="max-w-[1230px] pt-10 lg:pt-16">
                    <Text className="!text-white content-item">
                        Ao contrário do modelo tradicional de franquia, a nossa marca trabalha com um sistema de loja própria
                        autorizada. Isso significa que o lojista conduz sua
                        operação com mais autonomia, sem taxa de franquia e sem
                        cobrança de royalties, mas com o respaldo de uma marca
                        nacional, estrutura industrial própria e acompanhamento
                        especializado.
                    </Text>

                    <Text className="!text-white content-item">
                        Esse modelo é indicado para quem deseja empreender no
                        setor de móveis planejados com mais liberdade de gestão,
                        sem abrir mão de uma marca reconhecida, suporte técnico,
                        orientação comercial e estrutura de implantação.
                    </Text>
                </div>

                <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-9 text-center sm:text-start mt-10 lg:mt-20">
                    {businessModels.map((model, index) => (
                        <article
                            key={index}
                            aria-labelledby={`modelo-negocio-${index}-titulo`}
                            className={`px-3 sm:px-7 py-5 lg:px-14 lg:py-10 w-full sm:w-[634px] sm:h-[314px] ${model.style} ${index === 0 ? "card-left" : "card-right"}`}
                        >
                            <div className="flex flex-col-reverse sm:flex-row justify-between sm:items-center mb-6 lg:mb-8">
                                <Text
                                    id={`modelo-negocio-${index}-titulo`}
                                    weight="semibold"
                                    className="!text-inherit"
                                    variant="lead"
                                    role="heading"
                                    aria-level="3"
                                >
                                    {model.title}
                                </Text>

                                <img
                                    src={model.icon}
                                    alt=""
                                    aria-hidden="true"
                                    className="size-10 mx-auto sm:mx-0 mb-3 sm:mb-0"
                                />
                            </div>

                            {model.text.map((text, index) => (
                                <Text
                                    key={`text-` + index}
                                    className="!text-inherit mt-1"
                                >
                                    {text}
                                </Text>
                            ))}
                        </article>
                    ))}
                </div>

                <LinkButton
                    href={`${route("Home.index")}#orcamento`}
                    className="flex gap-2 truncate mx-auto mt-10 xl:mt-20 justify-center"
                >
                    Quero entender como funciona
                </LinkButton>
            </div>
        </section>
    );
};
