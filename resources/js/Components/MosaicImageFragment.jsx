export const MosaicImageFragment = ({
    src,
    blockColumns,
    blockRows,
    localColumn,
    localRow,
    objectPosition = "center",
}) => {
    return (
        <img
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            draggable="false"
            className="
                pointer-events-none
                absolute
                block
                max-w-none
                select-none
                object-cover
            "
            style={{
                width: `${blockColumns * 100}%`,
                height: `${blockRows * 100}%`,
                left: `${localColumn * -100}%`,
                top: `${localRow * -100}%`,
                objectPosition,
            }}
        />
    );
};