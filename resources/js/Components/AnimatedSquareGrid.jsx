import { Children, useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const AnimatedSquareGrid = ({
    children,
    columns,
    className = "",
}) => {
    const gridRef = useRef(null);

    const totalItems = Children.count(children);
    const rows = Math.ceil(totalItems / columns);

    useLayoutEffect(() => {
        const matchMedia = gsap.matchMedia();

        const context = gsap.context(() => {
            matchMedia.add(
                "(prefers-reduced-motion: no-preference)",
                () => {
                    const squares = gsap.utils.toArray(
                        "[data-mosaic-square]",
                        gridRef.current,
                    );

                    gsap.fromTo(
                        squares,
                        {
                            autoAlpha: 0,
                            scale: 0.65,
                        },
                        {
                            autoAlpha: 1,
                            scale: 1,
                            duration: 0.8,
                            ease: "back.out(1.4)",
                            stagger: {
                                amount: 1,
                                from: "random",
                                grid: [rows, columns],
                            },
                            scrollTrigger: {
                                trigger: gridRef.current,
                                start: "top 80%",
                                once: true,
                            },
                        },
                    );
                },
            );

            matchMedia.add(
                "(prefers-reduced-motion: reduce)",
                () => {
                    gsap.set("[data-mosaic-square]", {
                        autoAlpha: 1,
                        scale: 1,
                    });
                },
            );
        }, gridRef);

        return () => {
            matchMedia.revert();
            context.revert();
        };
    }, [columns, rows]);

    return (
        <div
            ref={gridRef}
            className={`grid ${className}`}
            style={{
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            }}
        >
            {children}
        </div>
    );
};