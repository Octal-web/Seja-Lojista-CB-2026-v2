import React, { useEffect, useMemo, useRef, useState } from "react";

import { graphicData as defaultGraphicData } from "@/Data/graphicData";
import { Text } from "@/Components/ui/Text";
import { Title } from "@/Components/ui/Title";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    Filler,
} from "chart.js";

import { Chart } from "react-chartjs-2";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LinkButton } from "./ui/LinkButton";

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    Filler,
);

gsap.registerPlugin(ScrollTrigger);

const ArrowIcon = () => {
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            focusable="false"
            className="mt-0.5 shrink-0"
        >
            <path
                d="M4 12h15M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

const FALLBACK_COLORS = {
    primary: "#51372b",
    secondary: "#ffd52f",
};

const getMonthKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");

    return `${year}-${month}`;
};

const formatMonth = (date) => {
    const month = new Intl.DateTimeFormat("pt-BR", {
        month: "short",
    })
        .format(date)
        .replace(".", "");

    const year = String(date.getFullYear()).slice(-2);

    return `${month.charAt(0).toUpperCase()}${month.slice(1)}/${year}`;
};

const formatLongMonth = (date) => {
    const formattedMonth = new Intl.DateTimeFormat("pt-BR", {
        month: "long",
        year: "numeric",
    }).format(date);

    return formattedMonth.charAt(0).toUpperCase() + formattedMonth.slice(1);
};

const formatPercentage = (value) => {
    if (typeof value !== "number" || value < 0) return null;

    return (
        new Intl.NumberFormat("pt-BR", {
            minimumFractionDigits: value % 1 === 0 ? 0 : 1,
            maximumFractionDigits: 1,
            signDisplay: "exceptZero",
        }).format(value) + "%"
    );
};

const normalizeChartValue = (value) => {
    return typeof value === "number" ? value : null;
};

const createMonthWindow = (amount = 12) => {
    const currentDate = new Date();
    const months = [];

    for (let index = amount - 1; index >= 0; index--) {
        months.push(
            new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() - index,
                1,
            ),
        );
    }

    return months;
};

const hasDataInLastThreeMonths = (data) => {
    const currentDate = new Date();
    const acceptedMonths = new Set();

    for (let index = 0; index < 3; index++) {
        acceptedMonths.add(
            getMonthKey(
                new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() - index,
                    1,
                ),
            ),
        );
    }

    return data.some((item) => {
        const hasRecord =
            typeof item.industryRevenue === "number" ||
            typeof item.growth === "number";

        return acceptedMonths.has(item.month) && hasRecord;
    });
};

export const IndustryChart = ({ graphicData = defaultGraphicData }) => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);

    const [colors, setColors] = useState(FALLBACK_COLORS);
    const [renderChart, setRenderChart] = useState(false);

    const shouldDisplay = useMemo(() => {
        return hasDataInLastThreeMonths(graphicData);
    }, [graphicData]);

    const normalizedData = useMemo(() => {
        const recordsByMonth = new Map(
            graphicData.map((item) => [item.month, item]),
        );

        return createMonthWindow(12).map((date) => {
            const month = getMonthKey(date);
            const record = recordsByMonth.get(month);

            return {
                month,
                date,
                label: formatMonth(date),
                longLabel: formatLongMonth(date),
                hasRecord: Boolean(record),
                industryRevenue: normalizeChartValue(record?.industryRevenue),
                growth: normalizeChartValue(record?.growth),
            };
        });
    }, [graphicData]);

    const latestRecord = useMemo(() => {
        return (
            [...normalizedData].reverse().find((item) => item.hasRecord) ?? null
        );
    }, [normalizedData]);

    const highestValues = useMemo(() => {
        const growthValues = normalizedData
            .map((item) => item.growth)
            .filter((value) => typeof value === "number" && value >= 0);

        const revenueValues = normalizedData
            .map((item) => item.industryRevenue)
            .filter((value) => typeof value === "number" && value >= 0);

        return {
            growth: growthValues.length ? Math.max(...growthValues) : null,
            industryRevenue: revenueValues.length
                ? Math.max(...revenueValues)
                : null,
        };
    }, [normalizedData]);

    useEffect(() => {
        const rootStyles = getComputedStyle(document.documentElement);

        setColors({
            primary:
                rootStyles.getPropertyValue("--color-primary").trim() ||
                FALLBACK_COLORS.primary,
            secondary:
                rootStyles.getPropertyValue("--color-secondary").trim() ||
                FALLBACK_COLORS.secondary,
        });
    }, []);

    useEffect(() => {
        if (!shouldDisplay) return undefined;

        const context = gsap.context(() => {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top 80%",
                once: true,
                onEnter: () => {
                    setRenderChart(true);

                    gsap.fromTo(
                        contentRef.current,
                        {
                            y: 20,
                            opacity: 0,
                        },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.7,
                            ease: "power2.out",
                        },
                    );
                },
            });
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => context.revert();
    }, [shouldDisplay]);

    const chartData = useMemo(() => {
        return {
            labels: normalizedData.map((item) => item.label),
            datasets: [
                {
                    label: "Receita da indústria",
                    data: normalizedData.map((item) => item.industryRevenue),
                    borderColor: "#f1c000",
                    backgroundColor: "#f1c000",
                    pointBackgroundColor: "#f1c000",
                    pointBorderColor: "#ffffff",
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    borderWidth: 3,
                    tension: 0.38,
                    spanGaps: false,
                    fill: false,
                },
                {
                    label: "Crescimento M/M",
                    data: normalizedData.map((item) => item.growth),
                    borderColor: colors.primary,
                    backgroundColor: colors.primary,
                    pointBackgroundColor: colors.primary,
                    pointBorderColor: "#ffffff",
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    borderWidth: 3,
                    tension: 0.38,
                    spanGaps: false,
                    fill: false,
                },
            ],
        };
    }, [normalizedData, colors.primary]);

    const chartOptions = useMemo(() => {
        return {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: "index",
                intersect: false,
            },
            animation: {
                duration: 1200,
                easing: "easeOutQuart",
            },
            scales: {
                x: {
                    border: {
                        display: false,
                    },
                    grid: {
                        display: false,
                    },
                    ticks: {
                        color: colors.primary,
                        font: {
                            family: "inherit",
                            size: 12,
                        },
                        maxRotation: 0,
                        minRotation: 0,
                    },
                },
                y: {
                    beginAtZero: true,
                    border: {
                        display: false,
                    },
                    grid: {
                        color: "rgba(81, 55, 43, 0.12)",
                        drawTicks: false,
                    },
                    ticks: {
                        color: colors.primary,
                        padding: 12,
                        callback: (value) => `${value}%`,
                        font: {
                            family: "inherit",
                            size: 12,
                        },
                    },
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    backgroundColor: "#333333",
                    titleColor: "#ffffff",
                    bodyColor: "#ffffff",
                    padding: 14,
                    cornerRadius: 5,
                    displayColors: true,
                    filter: (tooltipItem) => tooltipItem.raw !== null,
                    titleFont: {
                        family: "inherit",
                        size: 13,
                        weight: "600",
                    },
                    bodyFont: {
                        family: "inherit",
                        size: 13,
                    },
                    callbacks: {
                        title: (items) => {
                            if (!items.length) return "";

                            return (
                                normalizedData[items[0].dataIndex]?.longLabel ??
                                ""
                            );
                        },
                        label: (context) => {
                            if (context.raw === null) return "";

                            const value = new Intl.NumberFormat("pt-BR", {
                                minimumFractionDigits:
                                    Number(context.raw) % 1 === 0 ? 0 : 1,
                                maximumFractionDigits: 1,
                                signDisplay: "exceptZero",
                            }).format(context.raw);

                            return `${context.dataset.label}: ${value}%`;
                        },
                    },
                },
            },
        };
    }, [colors, normalizedData]);

    const latestRevenue = formatPercentage(latestRecord?.industryRevenue);
    const latestGrowth = formatPercentage(latestRecord?.growth);
    const highestGrowth = formatPercentage(highestValues.growth);
    const highestRevenue = formatPercentage(highestValues.industryRevenue);

    const hasLatestHighlights = latestRevenue !== null || latestGrowth !== null;
    const hasHighestValues = highestGrowth !== null || highestRevenue !== null;

    if (!shouldDisplay) return null;

    return (
        <section
            ref={sectionRef}
            className="relative z-[1] bg-white pt-10 xl:pt-20 2xl:pt-24"
        >
            <div ref={contentRef} className="container max-w-medium opacity-0">
                {/* <div className="mb-10 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <Text
                            as="span"
                            variant="eyebrow"
                            weight="semibold"
                            className="mb-3 block text-secondary"
                        >
                            Mercado em crescimento
                        </Text>

                        <Title
                            as="h2"
                            variant="section"
                            className="text-primary"
                        >
                            Receita e crescimento da indústria
                        </Title>

                        <Text
                            variant="body"
                            className="mt-4 max-w-xl text-primary/75"
                        >
                            Evolução percentual da receita industrial e do
                            crescimento em relação ao mês anterior.
                        </Text>
                    </div>

                    {latestRecord && hasLatestHighlights && (
                        <div className="flex flex-wrap gap-3">
                            {latestRevenue !== null && (
                                <div className="min-w-[180px] rounded-2xl bg-secondary px-6 py-4 text-primary">
                                    <Text
                                        as="span"
                                        variant="label"
                                        weight="semibold"
                                        className="block"
                                    >
                                        Receita industrial
                                    </Text>
                                    <Title
                                        as="strong"
                                        variant="metric"
                                        className="mt-2 block"
                                    >
                                        {latestRevenue}
                                    </Title>
                                    <Text
                                        as="span"
                                        variant="small"
                                        className="mt-1 block"
                                    >
                                        {latestRecord.longLabel}
                                    </Text>
                                </div>
                            )}

                            {latestGrowth !== null && (
                                <div className="min-w-[180px] rounded-2xl bg-primary px-6 py-4 text-white">
                                    <Text
                                        as="span"
                                        variant="label"
                                        weight="semibold"
                                        className="block"
                                    >
                                        Crescimento
                                    </Text>
                                    <Title
                                        as="strong"
                                        variant="metric"
                                        className="mt-2 block"
                                    >
                                        {latestGrowth}
                                    </Title>
                                    <Text
                                        as="span"
                                        variant="small"
                                        className="mt-1 block"
                                    >
                                        M/M
                                    </Text>
                                </div>
                            )}
                        </div>
                    )}
                </div> */}

                <LinkButton
                    href={`${route("Home.index")}#orcamento`}
                    className="flex gap-2 relative translate-y-1/2 mx-auto"
                >
                    <svg
                        width="27"
                        height="27"
                        viewBox="0 0 27 27"
                        fill="none"
                        aria-hidden="true"
                        className="shrink-0"
                    >
                        <path
                            d="M4 13.5H22M15.5 7L22 13.5L15.5 20"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <span>Quero saber mais sobre a Casa Brasileira</span>
                </LinkButton>

                {/* <div className="rounded-[10px] border border-primary/15 bg-white p-5 shadow-sm sm:p-8 xl:p-10">
                    <div className="mb-8 flex flex-wrap gap-6 text-primary">
                        <div className="flex items-center gap-2">
                            <span className="h-0.5 w-6 bg-[#f1c000]" aria-hidden="true" />
                            <Text as="span" variant="none" className="text-sm">Receita da indústria</Text>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="h-0.5 w-6 bg-primary" aria-hidden="true" />
                            <Text as="span" variant="none" className="text-sm">Crescimento M/M</Text>
                        </div>
                    </div>

                    <div className="h-[340px] sm:h-[420px] xl:h-[470px]">
                        {renderChart && (
                            <Chart
                                type="line"
                                data={chartData}
                                options={chartOptions}
                                role="img"
                                aria-label="Gráfico dos últimos doze meses com linhas de receita da indústria e crescimento mensal."
                            />
                        )}
                    </div>
                </div> */}

                {/* {hasHighestValues && (
                    <div className="relative mt-10 translate-y-1/2 rounded-[26px] bg-secondary px-6 py-8 text-primary sm:px-10 2xl:px-16">
                        <div className="grid gap-4 lg:grid-cols-2 lg:items-center lg:gap-10">
                            <Title as="h3" variant="compact" weight="semibold" className="text-balance">
                                Segundo a Abimóvel, o mercado vem crescendo com consistência ano a ano.
                            </Title>

                            <ul className="space-y-2">
                                {highestGrowth !== null && (
                                    <li className="flex items-start gap-4 tracking-tighter">
                                        <ArrowIcon />

                                        <Text as="span" variant="body">
                                            Nos últimos 12 meses, o maior crescimento mensal chegou a{' '}
                                            <strong className="font-normal">{highestGrowth}</strong>
                                        </Text>
                                    </li>
                                )}

                                {highestRevenue !== null && (
                                    <li className="flex items-start gap-4">
                                        <ArrowIcon />

                                        <Text as="span" variant="body">
                                            A maior alta da receita da indústria no período foi de{' '}
                                            <strong className="font-normal">{highestRevenue}</strong>
                                        </Text>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                )} */}
            </div>
        </section>
    );
};
