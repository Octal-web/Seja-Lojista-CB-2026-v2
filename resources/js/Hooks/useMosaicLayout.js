import { useEffect, useState } from "react";

const getCurrentLayout = () => {
    if (typeof window === "undefined") {
        return "mobile";
    }

    if (window.matchMedia("(min-width: 1280px)").matches) {
        return "desktop";
    }

    if (window.matchMedia("(min-width: 768px)").matches) {
        return "tablet";
    }

    return "mobile";
};

export const useMosaicLayout = () => {
    const [layout, setLayout] = useState(getCurrentLayout);

    useEffect(() => {
        const tabletMedia = window.matchMedia("(min-width: 768px)");
        const desktopMedia = window.matchMedia("(min-width: 1280px)");

        const updateLayout = () => {
            setLayout(getCurrentLayout());
        };

        tabletMedia.addEventListener("change", updateLayout);
        desktopMedia.addEventListener("change", updateLayout);

        updateLayout();

        return () => {
            tabletMedia.removeEventListener("change", updateLayout);
            desktopMedia.removeEventListener("change", updateLayout);
        };
    }, []);

    return layout;
};