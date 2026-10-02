import business from "@/imgs/content/display/business-opportunity.jpg";
import { Title } from "./ui/Title";
import { Text } from "./ui/Text";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const BusinessOppornutity = () => {
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
                ".image",
                {
                    x: 40,
                    opacity: 0,
                    duration: 0.9,
                    ease: "power3.out",
                },
                "-=0.95",
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            aria-labelledby="mercado-moveis-oportunidades-titulo"
            className="bg-secondary pt-20 xl:pt-24 2xl:pt-[107px]"
        >
            <div className="container 2xl:max-w-large flex flex-col xl:flex-row justify-between gap-10 2xl:gap-14">
                <div className="lg:pb-20 2xl:pb-28">
                    <Title
                        id="mercado-moveis-oportunidades-titulo"
                        variant="none"
                        weight="thin"
                        className="mt-10 text-[30px] leading-[1.3] tracking-[-0.035em] text-primary sm:text-[38px] 2xl:text-[45px] content-item"
                    >
                        O mercado de móveis planejados
                        <span className="ml-2 xl:ml-0 xl:block font-bold content-item">
                            segue movimentando grandes
                        </span>
                        <span className="ml-2 xl:ml-0 xl:block font-bold content-item">
                            oportunidades no Brasil
                        </span>
                    </Title>

                    <Text className="lg:max-w-[770px] pt-7 lg:pt-14 content-item">
                        O setor moveleiro brasileiro está diretamente ligado a
                        momentos importantes da vida das pessoas: construção,
                        reforma, compra de imóvel, mudança de casa e valorização
                        dos ambientes. Esse comportamento mantém o segmento
                        relevante em todas as regiões do país e abre espaço
                        para marcas estruturadas crescerem com novos lojistas.
                    </Text>

                    <Text weight="bold" variant="small" className="content-item">
                        Segundo a ABIMÓVEL, o setor moveleiro brasileiro movimentou mais de R$ 92,1 bilhões em 2025, reforçando a relevância econômica do segmento e seu potencial para novos negócios.
                    </Text>
                </div>

                <img
                    src={business}
                    alt="Loja Casa Brasileira"
                    className="rounded-t-[18px] md:h-[493px] xl:w-[500px] 2xl:w-[679px] mt-auto border border-[#707070] object-cover image"
                />
            </div>
        </section>
    );
};