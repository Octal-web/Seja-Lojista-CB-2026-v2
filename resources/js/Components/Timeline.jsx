import { timeline } from "@/Data/timeline";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Text } from "./ui/Text";
import { Title } from "./ui/Title";

gsap.registerPlugin(ScrollTrigger);

export const Timeline = () => {
    const timelineRef = useRef(null);
    const headingRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                headingRef.current,
                {
                    y: 25,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 85%",
                    },
                },
            );

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: timelineRef.current,
                    start: "top 80%",
                },
            });

            tl.from(".timeline-line-mobile", {
                scaleY: 0,
                transformOrigin: "top center",
                duration: 0.8,
                ease: "power1.inOut",
            });

            tl.from(".timeline-line", {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 0.8,
                ease: "none",
                stagger: 0.76,
            });

            tl.from(
                ".timeline-dot",
                {
                    scale: 0,
                    stagger: 0.15,
                    duration: 0.4,
                    ease: "back.out(2)",
                },
                "<",
            );
        }, timelineRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="implantacao"
            aria-labelledby="timeline-title"
            className="pt-20 sm:pt-32"
        >
            <div className="text-center container">
                <Title
                    ref={headingRef}
                    id="timeline-title"
                    variant="section"
                    weight="normal"
                >
                    Como se tornar um lojista Casa Brasileira
                </Title>
                <Text className="mt-6">
                    Abrir uma loja é um processo conduzido em etapas, com
                    acompanhamento da equipe de expansão desde o primeiro
                    <span className="ml-2 xl:ml-0 xl:block">
                        contato até o início da operação.
                    </span>
                </Text>
            </div>

            <div ref={timelineRef}>
                <TimelineSwiper />
                <TimelineMobile />
            </div>
        </section>
    );
};

const TimelineSwiper = () => {
    const prevButtonRef = useRef(null);
    const nextButtonRef = useRef(null);
    const swiperRef = useRef(null);

    return (
        <div className="container max-w-large mt-16 lg:mt-24 hidden sm:block">
            <Swiper
                className="!overflow-visible"
                slidesPerView={"auto"}
                role="list"
                ref={swiperRef}
                aria-label="Etapas para se tornar um lojista Casa Brasileira"
            >
                {timeline.map((item, index) => (
                    <SwiperSlide
                        key={index}
                        className="!w-auto"
                        modules={[Navigation]}
                        role="listitem"
                        aria-labelledby={`timeline-etapa-${index}-titulo`}
                    >
                        <div className="h-[340px] flex flex-col relative">
                            <div className="pr-28 xl:pr-[162px] last:pr-0 z-10">
                                <Title
                                    id={`timeline-etapa-${index}-titulo`}
                                    variant="compact"
                                    className="mb-9"
                                >
                                    {item.title}
                                    <span className="block">{item.title2}</span>
                                </Title>
                                <p
                                    aria-label={`Etapa ${index + 1}`}
                                    className="bg-primary size-8 md:size-10 rounded-full text-white flex justify-center items-center font-semibold text-base md:text-xl ml-10 inktrap timeline-dot"
                                >
                                    {index + 1}
                                </p>

                                <Text className="w-[340px] mt-6">
                                    {item.text}
                                </Text>
                            </div>

                            <div
                                aria-hidden="true"
                                className="absolute left-0 right-0 top-24 sm:top-[115px] md:top-[120px] z-0"
                            >
                                <div className="timeline-line h-[2px] bg-primary w-full" />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="flex gap-3 mt-5">
                <button
                    ref={prevButtonRef}
                    onClick={() => swiperRef.current?.swiper.slidePrev()}
                    className="rounded-full border-2 border-primary  px-1 py-1.5 flex justify-center hover:opacity-80"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button
                    ref={nextButtonRef}
                    onClick={() => swiperRef.current?.swiper.slideNext()}
                    className="rounded-full border-2 border-primary  px-1 py-1.5 flex justify-center hover:opacity-80"
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </div>
    );
};

const TimelineMobile = () => (
    <div className="relative sm:hidden container mt-16">
        <div className="absolute left-9 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-primary timeline-line-mobile" />

        {timeline.map((item, index) => (
            <div key={index} className="relative pl-14 pb-10">
                <div className="absolute left-0 size-8 rounded-full bg-primary text-white flex items-center justify-center timeline-dot">
                    {index + 1}
                </div>

                <Title variant="compact">
                    {item.title}
                    <span className="block">{item.title2}</span>
                </Title>

                <Text className="mt-4">{item.text}</Text>
            </div>
        ))}
    </div>
);
