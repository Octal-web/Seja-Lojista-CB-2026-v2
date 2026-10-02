import React, { useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';

import { Title } from '@/Components/ui/Title';
import { Text } from '@/Components/ui/Text';

import { gsap } from 'gsap';

const CheckIcon = () => (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden="true" className="shrink-0">
        <circle cx="21" cy="21" r="19" stroke="currentColor" strokeWidth="2.5" />
        <path d="M12.5 21.5L18.2 27.2L30.5 14.8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const Concluded = () => {
    const sectionRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        const context = gsap.context(() => {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            if (prefersReducedMotion) {
                gsap.set(cardRef.current, { y: 0, opacity: 1, scale: 1 });
                return;
            }

            gsap.fromTo(
                cardRef.current,
                { y: 28, opacity: 0, scale: 0.98 },
                { y: 0, opacity: 1, scale: 1, duration: 0.75, ease: 'power2.out' }
            );
        }, sectionRef);

        return () => context.revert();
    }, []);

    return (
        <section ref={sectionRef} aria-labelledby="conclusion-title" className="min-h-screen bg-white pb-20 md:pb-0">
            <div className="bg-primary py-12 text-white sm:py-16">
                <div className="container max-w-medium text-center">
                    <Title id="conclusion-title" as="h1" variant="section" weight="bold" className="text-white">
                        Quero ser lojista
                    </Title>
                </div>
            </div>

            <div className="container max-w-medium py-12 text-center sm:py-24">
                <div ref={cardRef} className="mx-auto max-w-[760px] rounded-[30px] bg-[#f5f5f5] px-6 py-12 opacity-0 sm:px-10 sm:py-16">
                    <div className="mx-auto mb-8 flex size-[82px] items-center justify-center rounded-full bg-secondary text-primary">
                        <CheckIcon />
                    </div>

                    <Title as="h2" variant="section" weight="bold" className="text-primary">
                        Cadastro feito com sucesso
                    </Title>

                    <Text as="p" variant="none" weight="light" className="mx-auto mt-6 max-w-[620px] text-base leading-[1.8] text-primary/80 sm:text-lg">
                        Seu cadastro foi finalizado com sucesso. Em breve, nosso gestor de expansão entrará em contato com você.
                    </Text>

                    <Text as="p" variant="none" weight="light" className="mx-auto mt-5 max-w-[620px] text-sm leading-[1.8] text-primary/70 sm:text-base">
                        A Casa Brasileira é referência em móveis planejados no país, com lojas autorizadas que seguem o padrão da marca para garantir excelência, qualidade e uma experiência consistente em toda a rede.
                    </Text>

                    <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link
                            href={route('Home.index')}
                            className="flex min-h-[52px] items-center justify-center rounded-[14px] bg-secondary px-7 text-sm font-semibold text-primary transition-colors duration-300 hover:bg-[#f1c000] w-full sm:w-fit"
                        >
                            Voltar para o site
                        </Link>

                        <a
                            href="https://casabrasileiraplanejados.com.br/"
                            target="_blank"
                            className="w-full sm:w-fit flex min-h-[52px] items-center justify-center rounded-[14px] border border-primary/30 px-7 text-sm font-semibold text-primary transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-white"
                        >
                            Conheça mais sobre a nossa marca
                    </a>
                    </div>
                </div>
            </div>
        </section>
    );
}