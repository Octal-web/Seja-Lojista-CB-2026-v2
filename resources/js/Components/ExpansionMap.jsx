import { Fragment, useEffect, useMemo, useRef, useState } from "react";

import { expansionStates } from "@/Data/expansionStates";

import { LinkButton } from "@/Components/ui/LinkButton";
import { Title } from "@/Components/ui/Title";

import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
} from "react-simple-maps";

import { geoCentroid } from "d3-geo";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import MAP_URL from "@/imgs/maps/br-states.json";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Text } from "./ui/Text";

gsap.registerPlugin(ScrollTrigger);

const COLORS = {
    available: "#ffd52f",
    availableHover: "#51372b",
    unavailable: "#E2E2E2",
    border: "white",
    label: "#51372b",
    labelHover: "#51372b",
};

const labelOffsets = {
    MT: {
        dx: 0,
        dy: 0.15,
    },
    AC: {
        dx: -0.5,
        dy: -0.18,
    },
    MS: {
        dx: 0,
        dy: -0.25,
    },
    TO: {
        dx: 0,
        dy: 0.1,
    },
    PA: {
        dx: 0,
        dy: 0.15,
    },
    PI: {
        dx: 0.08,
        dy: 0.05,
    },
    CE: {
        dx: 0.08,
        dy: 0,
    },
    SE: {
        dx: 0.12,
        dy: -0.02,
    },
    RN: {
        dx: 0.1,
        dy: -0.02,
    },
    PB: {
        dx: 0.8,
        dy: -0.8,
    },
    PE: {
        dx: 0.08,
        dy: 0.02,
    },
    MG: {
        dx: 0,
        dy: 0.1,
    },
    ES: {
        dx: 0.1,
        dy: 0,
    },
    RJ: {
        dx: 0.12,
        dy: -0.02,
    },
    SP: {
        dx: 0,
        dy: 0.1,
    },
    PR: {
        dx: 0,
        dy: 0.08,
    },
    SC: {
        dx: 0,
        dy: -0.6,
    },
    RS: {
        dx: 0,
        dy: 0.08,
    },
};

export const ExpansionMap = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const mapRef = useRef(null);

    const [shouldLoadMap, setShouldLoadMap] = useState(false);
    const [activeState, setActiveState] = useState(null);

    const availableStateCodes = useMemo(() => {
        return new Set(expansionStates.map((state) => state.uf));
    }, []);

    useEffect(() => {
        const mapElement = mapRef.current;

        if (!mapElement) return;

        if (!("IntersectionObserver" in window)) {
            setShouldLoadMap(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;

                setShouldLoadMap(true);
                observer.disconnect();
            },
            {
                root: null,

                rootMargin: "700px 0px",

                threshold: 0,
            },
        );

        observer.observe(mapElement);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const context = gsap.context(() => {
            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            if (prefersReducedMotion) {
                gsap.set([contentRef.current, mapRef.current], {
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 1,
                });

                return;
            }

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 72%",
                    once: true,
                },
            });

            timeline.fromTo(
                contentRef.current,
                {
                    x: -40,
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
                mapRef.current,
                {
                    x: 45,
                    opacity: 0,
                    scale: 0.97,
                },
                {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.9,
                    ease: "power2.out",
                },
                "-=0.6",
            );
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => context.revert();
    }, []);

    return (
        <section
            id="expansao"
            ref={sectionRef}
            aria-labelledby="expansion-map-title"
            className="overflow-hidden bg-white py-20 xl:pt-0 sm:pb-24"
        >
            <div className="container max-w-large">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10 xl:gap-16">
                    <div
                        ref={contentRef}
                        className="opacity-0 flex-col max-lg:flex lg:items-center"
                    >
                        <Title
                            id="expansion-map-title"
                            as="h3"
                            variant="smallsection"
                            weight="thin"
                            className="lg:max-w-[560px] text-primary !leading-tight"
                        >
                            A Casa Brasileira está
                            <span className="block font-bold">
                                avaliando novas praças
                            </span>
                            <span className="block font-bold">
                                pelo Brasil.
                            </span>
                        </Title>

                        <div className="mt-4 md:mt-9 2xl:max-w-[470px] space-y-3 lg:space-y-6">
                            <Text
                                as="p"
                                variant="none"
                                weight="light"
                                className="text-xs sm:text-sm leading-[1.7] text-primary/80 md:text-base"
                            >
                                A expansão da marca é conduzida com análise
                                estratégica de mercado. A marca avalia cidades
                                com potencial para novas operações, considerando
                                perfil de consumo, presença regional,
                                localização, oportunidade comercial e
                                exclusividade de atuação.
                            </Text>

                            <Text
                                as="p"
                                variant="none"
                                weight="light"
                                className="text-xs sm:text-sm leading-[1.7] text-primary/80 md:text-base"
                            >
                                Consulte se a sua cidade ou região está
                                disponível para receber uma loja.
                            </Text>
                        </div>

                        <Text
                            weight="semibold"
                            variant="lead"
                            className="relative pl-5 mt-6"
                        >
                            <span className="absolute left-0 -bottom-3 md:-bottom-1 xl:-bottom-3 2xl:-bottom-1 block w-1.5 h-16 sm:h-10 lg:h-20 2xl:h-[70px] bg-secondary -z-10 rounded-t-full rounded-b-full" />
                            Sua cidade pode ser a próxima praça Casa Brasileira.
                        </Text>

                        <LinkButton
                            href={`${route("Home.index")}#orcamento`}
                            className="mt-12 flex min-w-fit items-center gap-3 mx-auto lg:mx-0 truncate"
                        >
                            Consulte a disponibilidade da sua região
                        </LinkButton>
                    </div>

                    <div
                        ref={mapRef}
                        className="min-w-0 opacity-0"
                        aria-busy={!shouldLoadMap}
                    >
                        {shouldLoadMap ? (
                            <ComposableMap
                                width={600}
                                height={600}
                                projection="geoMercator"
                                projectionConfig={{
                                    center: [-52, -15],
                                    scale: 650,
                                }}
                                className="h-auto w-full"
                                role="img"
                                aria-label="Mapa do Brasil com os estados disponíveis para expansão destacados"
                            >
                                <Geographies geography={MAP_URL}>
                                    {({ geographies }) =>
                                        geographies.map((geo) => {
                                            const stateCode = geo.id;

                                            const isAvailable =
                                                availableStateCodes.has(
                                                    stateCode,
                                                );

                                            const isActive =
                                                activeState === stateCode;

                                            const labelOffset = labelOffsets[
                                                stateCode
                                            ] ?? {
                                                dx: 0,
                                                dy: 0,
                                            };

                                            return (
                                                <Fragment key={geo.rsmKey}>
                                                    <Geography
                                                        geography={geo}
                                                        aria-label={
                                                            isAvailable
                                                                ? `${geo.properties.nome}: região disponível`
                                                                : geo.properties
                                                                      .nome
                                                        }
                                                        onMouseEnter={() => {
                                                            if (isAvailable) {
                                                                setActiveState(
                                                                    stateCode,
                                                                );
                                                            }
                                                        }}
                                                        onMouseLeave={() => {
                                                            setActiveState(
                                                                null,
                                                            );
                                                        }}
                                                        style={{
                                                            default: {
                                                                fill: COLORS.unavailable,
                                                                stroke: COLORS.border,
                                                                strokeWidth: 0.6,
                                                                outline: "none",
                                                                transition:
                                                                    "fill 250ms ease",
                                                                zIndex: 0,
                                                            },
                                                            hover: {
                                                                fill: COLORS.unavailable,
                                                                stroke: COLORS.border,
                                                                strokeWidth: 0.6,
                                                                outline: "none",
                                                                transition:
                                                                    "fill 250ms ease",
                                                            },
                                                            pressed: {
                                                                fill: COLORS.unavailable,
                                                                stroke: COLORS.border,
                                                                strokeWidth: 0.6,
                                                                outline: "none",
                                                            },
                                                        }}
                                                    />

                                                    {isAvailable && (
                                                        <Marker
                                                            coordinates={[
                                                                geoCentroid(
                                                                    geo,
                                                                )[0] +
                                                                    labelOffset.dx,
                                                                geoCentroid(
                                                                    geo,
                                                                )[1] +
                                                                    labelOffset.dy,
                                                            ]}
                                                            className="!pointer-events-none"
                                                        >
                                                            <foreignObject
                                                                x={-8}
                                                                y={-18}
                                                                width={16}
                                                                height={20}
                                                                style={{
                                                                    overflow:
                                                                        "visible",
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        justifyContent:
                                                                            "center",
                                                                        alignItems:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <FontAwesomeIcon
                                                                        icon={
                                                                            faLocationDot
                                                                        }
                                                                        color={
                                                                            "#575757"
                                                                        }
                                                                        size="sm"
                                                                    />
                                                                </div>
                                                            </foreignObject>
                                                        </Marker>
                                                    )}
                                                </Fragment>
                                            );
                                        })
                                    }
                                </Geographies>
                            </ComposableMap>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
