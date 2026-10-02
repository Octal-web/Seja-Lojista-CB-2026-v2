import React, { useEffect, useRef, useState } from 'react';

import { Text } from './ui/Text';

import { ChevronDown } from 'lucide-react';

export const Doubt = ({
    index,
    doubt,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);

    const questionId = `faq-question-${doubt.id ?? index}`;
    const answerId = `faq-answer-${doubt.id ?? index}`;

    useEffect(() => {
        const handleResize = () => {
            if (!isOpen) return;

            setIsOpen(false);

            requestAnimationFrame(() => {
                setIsOpen(true);
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isOpen]);

    return (
        <article
            className={[
                'overflow-hidden rounded-[34px] border bg-white transition-colors duration-300',
                isOpen
                    ? 'border-primary/45'
                    : 'border-[#e7ded2] hover:border-primary/35',
            ].join(' ')}
        >
            <h3>
                <button
                    id={questionId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => {
                        setIsOpen((current) => !current);
                    }}
                    className={[
                        'flex w-full items-center gap-5 text-left',
                        'px-6 py-4 sm:px-10 sm:py-5',
                        isOpen ? 'pb-3 sm:pb-4' : '',
                    ].join(' ')}
                >
                    <Text
                        as="span"
                        variant="none"
                        weight="semibold"
                        className="flex-1 text-base sm:text-lg leading-snug text-primary lg:text-xl 2xl:text-[25px]"
                    >
                        {doubt.title}
                    </Text>

                    <ChevronDown
                        size={28}
                        strokeWidth={1.8}
                        aria-hidden="true"
                        className={[
                            'shrink-0 text-primary/70 transition-transform duration-300',
                            isOpen ? 'rotate-180' : '',
                        ].join(' ')}
                    />
                </button>
            </h3>

            <div
                id={answerId}
                ref={contentRef}
                role="region"
                aria-labelledby={questionId}
                className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
                style={{
                    maxHeight: isOpen
                        ? `${contentRef.current?.scrollHeight ?? 0}px`
                        : '0px',
                }}
            >
                <div className="px-6 pb-7 sm:px-10 sm:pb-9">
                    <Text
                        as="p"
                        variant="none"
                        weight="light"
                        className="max-w-[780px] text-xs sm:text-base leading-[1.8] text-primary/80 md:text-base"
                    >
                        {doubt.text}
                    </Text>
                </div>
            </div>
        </article>
    );
};