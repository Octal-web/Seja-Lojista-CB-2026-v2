export const MosaicSquare = ({
    children,
    className = "",
}) => {
    return (
        <div
            data-mosaic-square
            className={`
                relative
                aspect-[44/39]
                overflow-hidden
                rounded-[15%]
                bg-neutral-50
                ${className}
            `}
        >
            {children}

            <span
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-10
                    rounded-[15%]
                    border
                    border-black/10
                "
            />
        </div>
    );
};