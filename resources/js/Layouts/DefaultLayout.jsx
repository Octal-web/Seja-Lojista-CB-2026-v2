import { Head, Link, usePage } from "@inertiajs/react";
import { useEffect, useMemo, useRef, useState } from "react";

import Lenis from "lenis";

import { CookieModal } from "@/Components/CookieModal";
import { MenuItem } from "@/Components/MenuItem";
import { LinkButton } from "@/Components/ui/LinkButton";
import { useVisitTracking } from "@/Hooks/useVisitTracking";

import { faqDoubts } from "@/Data/faqDoubts";
import logoAlt from "@/imgs/site/img/logo-alt.png";
import logoMain from "@/imgs/site/img/logo-main.png";
import logoOctal from "@/imgs/site/img/octalweb-logo.png";

import icon from "@/imgs/favicon.ico";

const DefaultLayout = ({
    children,
    title = "Seja Lojista | Casa Brasileira",
    description = "A Casa Brasileira abre suas portas para que você faça parte da realização de muitos e muitos sonhos.",
}) => {
    const { controller, action, notifyCookie, rejectCookie, lojas } =
        usePage().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [trackingEnabled, setTrackingEnabled] = useState(false);

    useVisitTracking();
    const lenisRef = useRef(null);
    const [stores, setStores] = useState([]);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: false,
        });

        lenisRef.current = lenis;

        window.lenis = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            delete window.lenis;
            lenis.destroy();
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const acceptCookies = () => {
        setTrackingEnabled(true);
    };

    useEffect(() => {
        const hasCookie = (name) => {
            return document.cookie
                .split("; ")
                .some((cookie) => cookie.startsWith(`${name}=`));
        };

        const acceptedCookies = notifyCookie || hasCookie("notify-cookies");
        const rejectedCookies = rejectCookie || hasCookie("reject-cookies");

        if (!acceptedCookies || rejectedCookies) {
            return;
        }

        if (!document.getElementById("gtm-script")) {
            const script = document.createElement("script");

            script.id = "gtm-script";
            script.innerHTML = `
            (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),
                    dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WCFTFZF');
        `;

            document.head.appendChild(script);
        }

        if (!document.getElementById("gtag-script")) {
            const gtagScript = document.createElement("script");

            gtagScript.id = "gtag-script";
            gtagScript.async = true;
            gtagScript.src =
                "https://www.googletagmanager.com/gtag/js?id=UA-176428372-5";

            document.head.appendChild(gtagScript);
        }

        if (!window.gtag) {
            window.dataLayer = window.dataLayer || [];

            window.gtag = function gtag() {
                window.dataLayer.push(arguments);
            };

            window.gtag("js", new Date());
            window.gtag("config", "UA-176428372-5");
        }

        if (!document.getElementById("gtm-noscript")) {
            const noscript = document.createElement("noscript");

            noscript.id = "gtm-noscript";
            noscript.innerHTML = `
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WCFTFZF" height="0" width="0" style="display:none;visibility:hidden"></iframe>
        `;

            document.body.appendChild(noscript);
        }
    }, [notifyCookie, rejectCookie, trackingEnabled]);

    const localBusinessSchema = useMemo(
        () => ({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "FurnitureStore"],
            name: "Seja Lojista | Casa Brasileira",
            description,
            url: window.location.origin,
            logo: {
                "@type": "ImageObject",
                url: `${window.location.origin}/site/img/logo-main.png`,
            },
            image: `${window.location.origin}/content/display/main-bg.jpg`,
            email: "atendimento@casabrasileiraplanejados.com.br",
            priceRange: "$$",
            sameAs: lojas.flatMap((s) =>
                [s.instagram, s.whatsapp].filter(Boolean),
            ),
            address: lojas.map((s) => ({
                "@type": "PostalAddress",
                addressLocality: s.cidade,
                addressRegion: s.estado,
                addressCountry: "BR",
                streetAddress: s.endereco.replace("\n", ", "),
            })),
            contactPoint: lojas.map((s) => ({
                "@type": "ContactPoint",
                name: s.nome,
                instagram: s.instagram,
                whatsapp: s.whatsapp,
                telephone: s.telefone,
                contactType: "customer service",
                areaServed: s.cidade,
                availableLanguage: "Portuguese",
            })),
            openingHoursSpecification: [
                {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                    ],
                    opens: "07:30",
                    closes: "17:20",
                },
                {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: "Saturday",
                    opens: "08:30",
                    closes: "12:00",
                },
            ],
        }),
        [],
    );

    const faqSchema = useMemo(
        () => ({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqDoubts.map((item) => ({
                "@type": "Question",
                name: item.title,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: item.text,
                },
            })),
        }),
        [],
    );

    const organizationSchema = useMemo(
        () => ({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Seja Lojista | Casa Brasileira",
            url: window.location.origin,
            logo: {
                "@type": "ImageObject",
                url: `${window.location.origin}/site/img/logo-main.png`,
            },
            email: "atendimento@casabrasileiraplanejados.com.br",
            contactPoint: lojas.map((s) => ({
                "@type": "ContactPoint",
                name: s.nome,
                instagram: s.instagram,
                whatsapp: s.whatsapp,
                telephone: s.telefone,
                contactType: "customer service",
                areaServed: s.cidade,
                availableLanguage: "Portuguese",
                email: s.email || undefined,
            })),
            sameAs: lojas.flatMap((s) =>
                [s.instagram, s.whatsapp].filter(Boolean),
            ),
        }),
        [lojas],
    );

    const menuItems = [
        {
            name: "História de sucesso",
            route: "Home.index",
            to: "#lojistas",
            external: false,
        },
        {
            name: "Modelo de negócio",
            route: "Home.index",
            to: "#modelo",
            external: false,
        },
        {
            name: "Por que a Casa Brasileira",
            route: "Home.index",
            to: "#casaBrasileira",
            external: false,
        },
        {
            name: "Grupo Unicasa",
            route: "Home.index",
            to: "#unicasa",
            external: false,
        },
    ];

    return (
        <>
            <Head>
                <title>{title}</title>

                <link
                    rel="canonical"
                    href={window.location.origin + window.location.pathname}
                />
                <meta name="description" content={description} />

                <meta property="og:url" content={window.location.pathname} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta
                    property="og:image"
                    content="/content/pages/casabrasileira.jpg"
                />

                <meta name="robots" content="index, follow" />
                <meta name="author" content="Octal Web" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description || ""} />
                <meta
                    name="twitter:image"
                    content="/content/pages/casabrasileira.jpg"
                />

                <link rel="icon" href={icon} type="image/x-icon" />

                <script type="application/ld+json">
                    {JSON.stringify(faqSchema)}
                </script>

                <script type="application/ld+json">
                    {JSON.stringify(localBusinessSchema)}
                </script>

                <script type="application/ld+json">
                    {JSON.stringify(organizationSchema)}
                </script>
            </Head>

            <header className="header fixed top-0 left-0 right-0 bg-white z-[20] transition-all duration-300 ease-in-out translate-y-0 shadow-2xl shadow-black/10">
                <div
                    className={`fixed inset-0 bg-black md:hidden duration-300 ease-out ${isMenuOpen ? "opacity-30" : "opacity-0 h-0"}`}
                    onClick={() => {
                        setIsMenuOpen(false);
                    }}
                ></div>
                <div className="container max-w-large">
                    <div className="flex items-center justify-between">
                        <div className="relative z-[1] flex items-center justify-between w-full my-5 xl:my-7">
                            <h1 className="absolute z-[1] transition-all -top-1">
                                <Link
                                    href={route("Home.index")}
                                    className="flex items-center"
                                >
                                    <img
                                        src={logoMain}
                                        alt="Logo"
                                        width={160}
                                        height={240}
                                        className="block max-w-32 xl:max-w-36 2xl:max-w-80"
                                    />
                                </Link>
                            </h1>

                            <button
                                className={`fixed top-0 left-0 w-screen h-screen lg:hidden bg-black transition-all ${isMenuOpen ? "opacity-50" : "opacity-0 pointer-events-none"}`}
                                onClick={() => setIsMenuOpen(false)}
                                title="Abrir Menu"
                            />

                            <div
                                className={`fixed max-lg:z-[2] lg:relative bg-white max-lg:pt-40 lg:bg-transparent left-0 ${!isMenuOpen ? "-top-1 max-lg:-translate-y-full" : "top-0"} lg:left-auto lg:top-auto flex flex-col lg:flex-row lg:items-center lg:ml-40 xl:ml-44 2xl:ml-60 w-full h-screen lg:h-auto lg:my-0.5 2xl:my-1.5 transition-all ease-out duration-500`}
                            >
                                <nav className="relative md:w-full">
                                    <ul className="flex flex-col lg:flex-row items-center gap-6 lg:gap-1 2xl:gap-8">
                                        {menuItems.map((item, index) => (
                                            <MenuItem
                                                key={index}
                                                item={item}
                                                index={index}
                                                isMenuOpen={isMenuOpen}
                                            />
                                        ))}

                                        <li
                                            className="lg:ml-auto max-md:opacity-0 max-md:translate-y-[-20px]"
                                            style={
                                                typeof window !== "undefined" &&
                                                window.innerWidth < 768
                                                    ? {
                                                          opacity: isMenuOpen
                                                              ? 1
                                                              : 0,
                                                          transform: isMenuOpen
                                                              ? "translateY(0)"
                                                              : "translateY(-20px)",
                                                          transition: `opacity 0.4s ease-out ${menuItems.length * 0.1}s, transform 0.4s ease-out ${menuItems.length * 0.1}s`,
                                                      }
                                                    : {}
                                            }
                                        >
                                            <LinkButton
                                                href={`${route("Home.index")}#orcamento`}
                                                className="flex gap-2 -my-2 truncate lg:px-2 xl:px-3 2xl:px-6 lg:text-xs xl:text-base 2xl:text-lg"
                                            >
                                                <span>
                                                    Quero abrir minha loja
                                                </span>
                                            </LinkButton>
                                        </li>
                                    </ul>
                                </nav>

                                <ul className="flex gap-2 mx-auto lg:hidden mt-10">
                                    <li>
                                        <a
                                            href="https://www.facebook.com/casabrasileiraoficial"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Facebook"
                                            className="transition-all opacity-100 hover:opacity-70"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24.377"
                                                height="24.377"
                                                viewBox="0 0 24.377 24.377"
                                            >
                                                <g>
                                                    <circle
                                                        cx="11.884"
                                                        cy="11.884"
                                                        r="11.384"
                                                        fill="none"
                                                        className="stroke-primary"
                                                        strokeWidth="1"
                                                    />
                                                    <path
                                                        d="M7.623,6.759l.334-2.175H5.87V3.173A1.087,1.087,0,0,1,7.1,2h.949V.147A11.568,11.568,0,0,0,6.361,0,2.655,2.655,0,0,0,3.52,2.927V4.584H1.609V6.759H3.52v5.257H5.87V6.759Z"
                                                        transform="translate(7.168 5.669)"
                                                        className="fill-primary"
                                                    />
                                                </g>
                                            </svg>
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="https://www.instagram.com/casabrasileiraoficial"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Instagram"
                                            className="transition-all opacity-100 hover:opacity-70"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24.377"
                                                height="24.377"
                                                viewBox="0 0 24.377 24.377"
                                            >
                                                <g>
                                                    <circle
                                                        cx="11.884"
                                                        cy="11.884"
                                                        r="11.384"
                                                        fill="none"
                                                        className="stroke-primary"
                                                        strokeWidth="1"
                                                    />
                                                    <path
                                                        d="M5.411,4.875A2.776,2.776,0,1,0,8.186,7.651,2.771,2.771,0,0,0,5.411,4.875Zm0,4.581a1.8,1.8,0,1,1,1.8-1.8A1.808,1.808,0,0,1,5.411,9.456ZM8.947,4.762A.647.647,0,1,1,8.3,4.114.646.646,0,0,1,8.947,4.762Zm1.838.657A3.2,3.2,0,0,0,9.911,3.15a3.225,3.225,0,0,0-2.269-.875c-.894-.051-3.573-.051-4.467,0a3.221,3.221,0,0,0-2.269.872A3.215,3.215,0,0,0,.033,5.416c-.051.894-.051,3.573,0,4.467a3.2,3.2,0,0,0,.875,2.269,3.229,3.229,0,0,0,2.269.875c.894.051,3.573.051,4.467,0a3.2,3.2,0,0,0,2.269-.875,3.225,3.225,0,0,0,.875-2.269C10.837,8.989,10.837,6.313,10.786,5.419ZM9.631,10.842A1.827,1.827,0,0,1,8.6,11.872a11.932,11.932,0,0,1-3.191.217,12.025,12.025,0,0,1-3.191-.217A1.827,1.827,0,0,1,1.19,10.842,11.932,11.932,0,0,1,.973,7.651,12.025,12.025,0,0,1,1.19,4.46,1.827,1.827,0,0,1,2.219,3.431a11.932,11.932,0,0,1,3.191-.217A12.025,12.025,0,0,1,8.6,3.431,1.827,1.827,0,0,1,9.631,4.46a11.932,11.932,0,0,1,.217,3.191A11.925,11.925,0,0,1,9.631,10.842Z"
                                                        transform="translate(7.16 4.62)"
                                                        className="fill-primary"
                                                    />
                                                </g>
                                            </svg>
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="https://www.youtube.com/@CasaBrasileiraPlanejados"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Youtube"
                                            className="transition-all opacity-100 hover:opacity-70"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24.377"
                                                height="24.377"
                                                viewBox="0 0 24.377 24.377"
                                            >
                                                <g>
                                                    <circle
                                                        cx="11.884"
                                                        cy="11.884"
                                                        r="11.384"
                                                        fill="none"
                                                        className="stroke-primary"
                                                        strokeWidth="1"
                                                    />
                                                    <path
                                                        id="Caminho_29"
                                                        data-name="Caminho 29"
                                                        d="M5.173.017c1.5-.033,3-.006,4.495.057,1.944.082,3.6-.161,3.848,2.268A20.716,20.716,0,0,1,13.4,7.9c-.362,1.624-1.767,1.535-3.126,1.612a60.992,60.992,0,0,1-6.957,0C2.4,9.46,1.031,9.507.48,8.617-.128,7.635,0,4.99.038,3.821.083,2.554-.06.813,1.407.318A16.3,16.3,0,0,1,5.173.017ZM5.449,2.8V6.826l3.429-2L5.449,2.8Z"
                                                        transform="translate(5 7)"
                                                        className="fill-primary"
                                                    />
                                                </g>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <button
                                className="ml-auto lg:hidden relative z-[2] px-2 py-2.5 rounded-xl bg-secondary"
                                onClick={toggleMenu}
                            >
                                <div className="flex items-center">
                                    <div className="relative w-6 h-[17px]">
                                        <div
                                            className={`absolute h-[3px] w-6 rounded bg-primary transition-all duration-300 ${isMenuOpen ? "rotate-45 !top-[7px]" : "top-0"}`}
                                            style={{
                                                transitionDelay: isMenuOpen
                                                    ? "0ms, 400ms"
                                                    : "0ms",
                                                transitionProperty:
                                                    "top, transform",
                                            }}
                                        ></div>
                                        <div
                                            className={`absolute h-[3px] w-6 rounded bg-primary transition-all duration-300 ${isMenuOpen ? "scale-x-0 top-[7px]" : "top-[7px]"}`}
                                            style={{
                                                transitionDelay: isMenuOpen
                                                    ? "0ms, 400ms"
                                                    : "0ms",
                                                transitionProperty:
                                                    "top, transform",
                                            }}
                                        ></div>
                                        <div
                                            className={`absolute h-[3px] w-6 rounded bg-primary transition-all duration-300 ${isMenuOpen ? "-rotate-45 bottom-[7px]" : "bottom-0 "}`}
                                            style={{
                                                transitionDelay: isMenuOpen
                                                    ? "0ms, 400ms"
                                                    : "0ms",
                                                transitionProperty:
                                                    "bottom, transform",
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="overflow-hidden pt-[78px] lg:pt-[84px] xl:pt-[102px] 2xl:pt-[108px] text-tertiary">
                <h1 className="sr-only">{description}</h1>
                {children}
            </main>

            <footer className="relative bg-primary">
                <div className="absolute inset-0 w-full h-full bg-black opacity-35" />
                <div className="container max-w-large">
                    <div className="relative">
                        <div className="-mb-2">
                            <img
                                src={logoAlt}
                                alt="Logo"
                                className="mx-auto max-sm:max-w-30 max-md:max-w-40 xl:h-full -translate-y-1/2"
                            />
                        </div>

                        <div className="pb-12 flex max-xl:flex-col justify-between gap-2 2xl:gap-4">
                            <nav>
                                <ul className="flex justify-center xl:justify-start gap-2 text-xs">
                                    <li className="text-white font-medium opacity-70 mt-1">
                                        Siga-nos:
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.facebook.com/casabrasileiraoficial"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Facebook"
                                            className="transition-all opacity-70 hover:opacity-100"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24.377"
                                                height="24.377"
                                                viewBox="0 0 24.377 24.377"
                                            >
                                                <g>
                                                    <circle
                                                        cx="11.884"
                                                        cy="11.884"
                                                        r="11.384"
                                                        fill="none"
                                                        stroke="#fff"
                                                        strokeWidth="1"
                                                    />
                                                    <path
                                                        d="M7.623,6.759l.334-2.175H5.87V3.173A1.087,1.087,0,0,1,7.1,2h.949V.147A11.568,11.568,0,0,0,6.361,0,2.655,2.655,0,0,0,3.52,2.927V4.584H1.609V6.759H3.52v5.257H5.87V6.759Z"
                                                        transform="translate(7.168 5.669)"
                                                        fill="#fff"
                                                    />
                                                </g>
                                            </svg>
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="https://www.instagram.com/casabrasileiraoficial"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Instagram"
                                            className="transition-all opacity-70 hover:opacity-100"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24.377"
                                                height="24.377"
                                                viewBox="0 0 24.377 24.377"
                                            >
                                                <g>
                                                    <circle
                                                        cx="11.884"
                                                        cy="11.884"
                                                        r="11.384"
                                                        fill="none"
                                                        stroke="#fff"
                                                        strokeWidth="1"
                                                    />
                                                    <path
                                                        d="M5.411,4.875A2.776,2.776,0,1,0,8.186,7.651,2.771,2.771,0,0,0,5.411,4.875Zm0,4.581a1.8,1.8,0,1,1,1.8-1.8A1.808,1.808,0,0,1,5.411,9.456ZM8.947,4.762A.647.647,0,1,1,8.3,4.114.646.646,0,0,1,8.947,4.762Zm1.838.657A3.2,3.2,0,0,0,9.911,3.15a3.225,3.225,0,0,0-2.269-.875c-.894-.051-3.573-.051-4.467,0a3.221,3.221,0,0,0-2.269.872A3.215,3.215,0,0,0,.033,5.416c-.051.894-.051,3.573,0,4.467a3.2,3.2,0,0,0,.875,2.269,3.229,3.229,0,0,0,2.269.875c.894.051,3.573.051,4.467,0a3.2,3.2,0,0,0,2.269-.875,3.225,3.225,0,0,0,.875-2.269C10.837,8.989,10.837,6.313,10.786,5.419ZM9.631,10.842A1.827,1.827,0,0,1,8.6,11.872a11.932,11.932,0,0,1-3.191.217,12.025,12.025,0,0,1-3.191-.217A1.827,1.827,0,0,1,1.19,10.842,11.932,11.932,0,0,1,.973,7.651,12.025,12.025,0,0,1,1.19,4.46,1.827,1.827,0,0,1,2.219,3.431a11.932,11.932,0,0,1,3.191-.217A12.025,12.025,0,0,1,8.6,3.431,1.827,1.827,0,0,1,9.631,4.46a11.932,11.932,0,0,1,.217,3.191A11.925,11.925,0,0,1,9.631,10.842Z"
                                                        transform="translate(7.16 4.62)"
                                                        fill="#fff"
                                                    />
                                                </g>
                                            </svg>
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="https://www.youtube.com/@CasaBrasileiraPlanejados"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Youtube"
                                            className="transition-all opacity-70 hover:opacity-100"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24.377"
                                                height="24.377"
                                                viewBox="0 0 24.377 24.377"
                                            >
                                                <g>
                                                    <circle
                                                        cx="11.884"
                                                        cy="11.884"
                                                        r="11.384"
                                                        fill="none"
                                                        stroke="#fff"
                                                        strokeWidth="1"
                                                    />
                                                    <path
                                                        id="Caminho_29"
                                                        data-name="Caminho 29"
                                                        d="M5.173.017c1.5-.033,3-.006,4.495.057,1.944.082,3.6-.161,3.848,2.268A20.716,20.716,0,0,1,13.4,7.9c-.362,1.624-1.767,1.535-3.126,1.612a60.992,60.992,0,0,1-6.957,0C2.4,9.46,1.031,9.507.48,8.617-.128,7.635,0,4.99.038,3.821.083,2.554-.06.813,1.407.318A16.3,16.3,0,0,1,5.173.017ZM5.449,2.8V6.826l3.429-2L5.449,2.8Z"
                                                        transform="translate(5 7)"
                                                        fill="#fff"
                                                    />
                                                </g>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </nav>

                            <nav className="my-2">
                                <ul className="flex justify-center max-xl:flex-wrap xl:justify-evenly gap-y-4 gap-x-3">
                                    <li>
                                        <Link
                                            href={route(
                                                "Politicas.privacidade",
                                            )}
                                            className="block text-white text-xs leading-none transition-all opacity-70 hover:opacity-100"
                                        >
                                            Política de privacidade
                                        </Link>
                                    </li>

                                    <li className="text-white text-xs leading-none opacity-70">
                                        |
                                    </li>

                                    <li>
                                        <Link
                                            href={route("Politicas.cookies")}
                                            className="block text-white text-xs leading-none transition-all opacity-70 hover:opacity-100"
                                        >
                                            Política de cookies
                                        </Link>
                                    </li>
                                </ul>
                            </nav>

                            <nav className="my-2 xl:max-w-[70%]">
                                <ul className="flex justify-center text-center max-lg:flex-wrap xl:justify-evenly gap-y-4 gap-x-6 sm:gap-x-4 2xl:gap-x-10">
                                    <li>
                                        <a
                                            href="https://casabrasileiraplanejados.com.br/crc"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block text-white text-xs sm:leading-none transition-all opacity-70 hover:opacity-100"
                                        >
                                            Central de Relacionamento com o
                                            Cliente 0800 721 4104
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="tel:08005152204"
                                            className="block text-white text-xs leading-none transition-all opacity-70 hover:opacity-100"
                                        >
                                            Canal de Ética 0800 515 2204
                                        </a>
                                    </li>
                                </ul>
                            </nav>

                            <div className="flex justify-center xl:justify-end items-center gap-4">
                                <span className="text-white text-xs opacity-70">
                                    Desenvolvido por:{" "}
                                </span>
                                <img
                                    src={logoOctal}
                                    alt="Octal Logo"
                                    className="opacity-50"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {!notifyCookie || !rejectCookie ? (
                <CookieModal
                    acceptCookies={acceptCookies}
                    visible={notifyCookie ? false : true}
                />
            ) : null}
        </>
    );
};

export default DefaultLayout;
