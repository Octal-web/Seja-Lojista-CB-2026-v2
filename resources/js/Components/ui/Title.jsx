import React, { forwardRef } from 'react';

const variants = {
    hero: 'text-2xl leading-[1.15] md:text-4xl 2xl:text-[48px]',
    heroSupport: 'text-xl !leading-tight',

    display: 'text-4xl !leading-tight tracking-tight sm:text-5xl xl:text-6xl',
    section: 'text-4xl !leading-tight sm:text-5xl',
    subsection: 'text-2xl !leading-tight sm:text-3xl',
    smallsection: 'text-2xl !leading-tight sm:text-4xl 2xl:text-[42px]',
    card: 'text-xl leading-[1.2] sm:text-2xl',
    compact: 'text-xl leading-[1.08] tracking-tight sm:text-2xl',
    metric: 'text-xl lg:text-3xl leading-none',
    number: 'leading-[0.8] tracking-[-0.06em] text-[60px] sm:text-[70px] 2xl:text-[120px]',
    none: '',
};

const weights = {
    thin: 'font-thin',
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
};

export const Title = forwardRef(({
    as: Component = 'h2',
    variant = 'section',
    weight = 'light',
    className = '',
    children,
    ...props
}, ref) => {
    const classes = [
        variants[variant] ?? variants.section,
        weights[weight] ?? weights.light,
        className,
        'inktrap',
        'text-tertiary'
    ].filter(Boolean).join(' ');

    return (
        <Component ref={ref} className={classes} {...props}>
            {children}
        </Component>
    );
});

Title.displayName = 'Title';
