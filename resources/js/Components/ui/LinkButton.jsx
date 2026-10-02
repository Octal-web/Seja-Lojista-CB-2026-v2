import { Link, router } from "@inertiajs/react";

export function LinkButton({
    children,
    className = "",
    href = "",
    closeOnClick,
    ...props
}) {
    const base =
        "block w-fit text-xs sm:text-sm md:text-md lg:text-lg tracking-tight leading-snug font-bold text-center inktrap py-3.5 px-3 md:px-6 bg-secondary rounded-xl transition-all duration-200 hover:bg-[#f1c000] flex items-center";

    const handleClick = (e) => {
        if (!href.includes("#")) {
            return;
        }

        e.preventDefault();

        const url = new URL(href, window.location.origin);

        const hash = url.hash;
        url.hash = "";

        const targetUrl = url.href;
        const currentUrl = window.location.origin + window.location.pathname;

        const scrollToElement = () => {
            if (!hash) return;

            const element = document.querySelector(hash);
            if (!element) return;

            const headerHeight =
                document.querySelector(".header")?.offsetHeight ?? 0;

            if (window.lenis) {
                window.lenis.scrollTo(element, {
                    offset: -headerHeight,
                });
            } else {
                element.scrollIntoView({
                    behavior: "smooth",
                });
            }

            closeOnClick?.(false);
        };

        if (targetUrl === currentUrl) {
            scrollToElement();
            return;
        }

        router.visit(targetUrl, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                requestAnimationFrame(() => {
                    requestAnimationFrame(scrollToElement);
                });
            },
        });
    };

    return (
        <Link
            className={`${base} ${className}`}
            onClick={handleClick}
            {...props}
        >
            {children}
        </Link>
    );
}
