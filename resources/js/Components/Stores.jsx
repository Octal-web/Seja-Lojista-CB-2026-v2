import { stores } from "@/Data/stores";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { LinkButton } from "./ui/LinkButton";
import { Text } from "./ui/Text";
import { Title } from "./ui/Title";
import { Video } from "./Video";

gsap.registerPlugin(ScrollTrigger);

export const Stores = () => {
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
                    ease: "power2.out",
                },
                "-=0.5",
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);
    return (
        <section
            ref={sectionRef}
            id="lojistas"
            aria-labelledby="historias-lojistas-titulo"
            className="bg-[#F7F3ED] py-12 sm:pt-16 xl:pt-20 2xl:pt-24 2xl:pb-24"
        >
            <div className="container max-w-large flex flex-col items-center text-center">
                <Title
                    id="historias-lojistas-titulo"
                    variant="none"
                    weight="thin"
                    className="mt-10 xl:max-w-[750px] text-[30px] leading-[1.3] tracking-[-0.035em] text-primary sm:text-[42px] 2xl:text-[46px] content-item"
                >
                    Histórias reais de quem
                    <span className="ml-2.5 font-bold content-item">
                        já faz parte da <span className="whitespace-nowrap">Casa Brasileira</span>
                    </span>
                </Title>

                <Text className="max-w-[770px] pt-2 content-item">
                    Conhecer a experiência de quem já faz parte da rede ajuda a
                    entender, na prática, como funciona o modelo e como a marca
                    se apresenta em diferentes regiões.
                </Text>

                <Video />

                <div className="grid sm:grid-cols-3 gap-14 sm:gap-9 mt-16 lg:mt-24">
                    {stores.map((store, index) => (
                        <article
                            key={store.title}
                            aria-labelledby={`historia-loja-${index}-titulo`}
                            className="cards"
                        >
                            <img
                                className="h-72 w-full object-cover object-center xl:h-[438px] rounded-[20px]"
                                src={store.img}
                                alt={store.title}
                                loading="lazy"
                            />

                            <Text
                                id={`historia-loja-${index}-titulo`}
                                as="p"
                                variant="none"
                                weight="bold"
                                role="heading"
                                aria-level="3"
                                className="text-start mt-3.5 lg:mt-7"
                            >
                                {store.title}
                            </Text>
                            <Text className="lg:max-w-[300px] xl:max-w-[370px] text-start">
                                {store.text}
                            </Text>
                        </article>
                    ))}
                </div>

                <LinkButton
                    href={`${route("Home.index")}#orcamento`}
                    className="flex gap-2 truncate mx-auto mt-14 xl:mt-20 justify-center"
                >
                   Quero ter minha loja Casa Brasileira
                </LinkButton>
            </div>
        </section>
    );
};
