import { useForm } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

import { InputMask } from "@react-input/mask";

import { Text } from "./ui/Text";
import { Title } from "./ui/Title";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FormSelect } from "./ui/FormSelect";
import { useFormTracking } from "@/Hooks/useFormTracking";

gsap.registerPlugin(ScrollTrigger);

const investmentOptions = [
    { value: "4", label: "Entre R$ 400.000,00 a R$ 500.000,00" },
    { value: "5", label: "Entre R$ 500.000,00 a R$ 600.000,00" },
    { value: "6", label: "Entre R$ 600.000,00 a R$ 700.000,00" },
    { value: "7", label: "Acima de R$ 700.000,00" },
];

const partnerOptions = [
    { value: true, label: "Sim, terei um sócio investidor" },
    { value: false, label: "Não, irei investir sozinho" },
];

export const StoreFirstForm = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const formWrapperRef = useRef(null);
    const termsRef = useRef(null);

    const [phoneMask, setPhoneMask] = useState("(__) ____-____");
    const [termsVisible, setTermsVisible] = useState(false);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        clearErrors,
        reset,
        recentlySuccessful,
    } = useForm({
        nome: "",
        telefone: "",
        telefone_confirmation: "",
        email: "",
        politica: false,
        expectativa_investimento: "",

        origem: "",
        campanha: "",
        grupo: "",
        anuncio: "",
        entrada: "",
        posicao_formulario: "Início site",
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const now = new Date();

        now.setHours(now.getHours() - 3);

        const entrada = now.toISOString().slice(0, 19).replace("T", " ");

        setData((currentData) => ({
            ...currentData,

            origem: params.get("origin") || params.get("utm_source") || "",

            campanha:
                params.get("campaign") || params.get("utm_campaign") || "",

            grupo:
                params.get("group") ||
                params.get("utm_group") ||
                params.get("utm_medium") ||
                "",

            anuncio: params.get("ad") || params.get("utm_content") || "",

            entrada,
        }));
    }, []);

    useFormTracking("topo", data, [
        "nome",
        "telefone",
        "email",
        "expectativa_investimento",
        "politica",
    ]);

    useEffect(() => {
        const numbers = data.telefone.replace(/\D/g, "");

        setPhoneMask(
            numbers.length >= 10 ? "(__) _____-____" : "(__) ____-____",
        );
    }, [data.telefone]);

    useEffect(() => {
        const context = gsap.context(() => {
            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            if (prefersReducedMotion) {
                gsap.set([contentRef.current, formWrapperRef.current], {
                    x: 0,
                    opacity: 1,
                });

                return;
            }

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 72%",
                    once: true,
                },
            });

            timeline.fromTo(
                contentRef.current,
                {
                    x: -35,
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.75,
                    ease: "power2.out",
                },
            );

            timeline.fromTo(
                formWrapperRef.current,
                {
                    x: 35,
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                },
                "-=0.55",
            );
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => context.revert();
    }, []);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setData(name, type === "checkbox" ? checked : value);

        clearErrors(name);
    };

    const handleSelectChange = (name, option) => {
        setData(name, option?.value ?? "");
        clearErrors(name);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        post(route("Lojistas.enviar"), {
            preserveScroll: (page) => Object.keys(page.props.errors ?? {}).length > 0,

            onSuccess: () => {
                reset(
                    "nome",
                    "telefone",
                    "telefone_confirmation",
                    "email",
                    "politica",
                    "expectativa_investimento",
                );

                setTermsVisible(false);
            },
        });
    };

    const inputClassName = `
        h-10 md:h-[44px] w-full rounded-[10px]
        border border-[#e8ded3] bg-white
        px-5 text-sm text-primary
        placeholder:text-primary/30
        outline-none ring-0
        transition-colors duration-200
        focus:border-primary/60 focus:ring-0
    `;

    const ErrorMessage = ({ field }) => {
        if (!errors[field]) return null;

        return (
            <Text
                as="p"
                variant="none"
                weight="normal"
                role="alert"
                className="mt-1.5 bg-red-900 px-3 py-1.5 text-xs leading-snug text-white"
            >
                {errors[field]}
            </Text>
        );
    };

    return (
        <section
            ref={sectionRef}
            id="orcamento"
            aria-labelledby="lojista-form-title-topo"
            className="w-full scroll-mt-28 max-md:[&_label:not([id])]:!mb-1 rounded-[28px] bg-white/60 p-5 shadow-2xl shadow-black/30 sm:p-8 md:!translate-y-50"
        >
                <div>
                    <div
                        ref={contentRef}
                        className="opacity-0"
                    >
                        <Title
                            id="lojista-form-title-topo"
                            as="h2"
                            variant="none"
                            weight="thin"
                            className="text-2xl leading-[1.08] text-primary sm:text-[28px]"
                        >
                            Quero falar com a equipe de expansão 
                        </Title>

                        <div
                            id="lojista-form-description-topo"
                            className="mt-3"
                        >
                            <Text
                                as="p"
                                variant="none"
                                weight="light"
                                className="text-xs sm:text-sm leading-[1.6] text-primary/80"
                            >
                                Preencha o formulário e um de nossos consultores entrará em contato para apresentar as possibilidades de fazer parte da <span className="whitespace-nowrap">Casa Brasileira.</span>
                            </Text>
                        </div>
                    </div>

                    <div ref={formWrapperRef} className="mt-5 opacity-0">
                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            aria-labelledby="lojista-form-title-topo"
                            aria-describedby="lojista-form-description-topo"
                            aria-busy={processing}
                            id="form_CB_Sejalojista26'_topo"
                        >
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="nome-topo"
                                        className="mb-1 md:mb-2 block text-xs md:text-sm font-normal text-primary"
                                    >
                                        Nome*
                                    </label>

                                    <input
                                        id="nome-topo"
                                        type="text"
                                        name="nome"
                                        value={data.nome}
                                        onChange={handleChange}
                                        placeholder="Seu nome completo"
                                        autoComplete="name"
                                        aria-required="true"
                                        aria-invalid={Boolean(errors.nome)}
                                        aria-describedby={
                                            errors.nome
                                                ? "nome-error-topo"
                                                : undefined
                                        }
                                        className={inputClassName}
                                    />

                                    <div id="nome-error-topo">
                                        <ErrorMessage field="nome" />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="email-topo"
                                        className="mb-1 md:mb-2 block text-xs md:text-sm font-normal text-primary"
                                    >
                                        E-mail*
                                    </label>

                                    <input
                                        id="email-topo"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        placeholder="Seu e-mail"
                                        autoComplete="email"
                                        aria-required="true"
                                        aria-invalid={Boolean(errors.email)}
                                        aria-describedby={
                                            errors.email
                                                ? "email-error-topo"
                                                : undefined
                                        }
                                        className={inputClassName}
                                    />

                                    <div id="email-error-topo">
                                        <ErrorMessage field="email" />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="telefone-topo"
                                        className="mb-1 md:mb-2 block text-xs md:text-sm font-normal text-primary"
                                    >
                                        Telefone*
                                    </label>

                                    <InputMask
                                        id="telefone-topo"
                                        type="tel"
                                        name="telefone"
                                        mask={phoneMask}
                                        replacement={{
                                            _: /\d/,
                                        }}
                                        value={data.telefone}
                                        onChange={handleChange}
                                        placeholder="Seu telefone + DDD"
                                        autoComplete="tel"
                                        aria-required="true"
                                        aria-invalid={Boolean(errors.telefone)}
                                        aria-describedby={
                                            errors.telefone
                                                ? "telefone-error-topo"
                                                : undefined
                                        }
                                        className={inputClassName}
                                    />

                                    <div id="telefone-error-topo">
                                        <ErrorMessage field="telefone" />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="telefone_confirmation-topo"
                                        className="mb-1 md:mb-2 block text-xs md:text-sm font-normal text-primary"
                                    >
                                        Confirme seu telefone*
                                    </label>

                                    <InputMask
                                        id="telefone_confirmation-topo"
                                        type="tel"
                                        name="telefone_confirmation"
                                        mask={phoneMask}
                                        replacement={{
                                            _: /\d/,
                                        }}
                                        value={data.telefone_confirmation}
                                        onChange={handleChange}
                                        onPaste={(event) =>
                                            event.preventDefault()
                                        }
                                        placeholder="Confirme seu telefone"
                                        autoComplete="off"
                                        aria-required="true"
                                        aria-invalid={Boolean(
                                            errors.telefone_confirmation,
                                        )}
                                        aria-describedby={
                                            errors.telefone_confirmation
                                                ? "telefone_confirmation-error-topo"
                                                : undefined
                                        }
                                        className={inputClassName}
                                    />

                                    <div id="telefone_confirmation-error-topo">
                                        <ErrorMessage field="telefone_confirmation" />
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <FormSelect
                                        id="expectativa_investimento-topo"
                                        name="expectativa_investimento"
                                        label="Qual o seu orçamento disponível para investir?*"
                                        options={investmentOptions}
                                        value={data.expectativa_investimento}
                                        errors={errors}
                                        onChange={handleSelectChange}
                                        compact
                                    />
                                </div>
                            </div>

                            <input
                                type="hidden"
                                name="origem"
                                value={data.origem}
                            />

                            <input
                                type="hidden"
                                name="campanha"
                                value={data.campanha}
                            />

                            <input
                                type="hidden"
                                name="grupo"
                                value={data.grupo}
                            />

                            <input
                                type="hidden"
                                name="anuncio"
                                value={data.anuncio}
                            />

                            <input
                                type="hidden"
                                name="entrada"
                                value={data.entrada}
                            />

                            <input
                                type="hidden"
                                name="posicao_formulario"
                                value={data.posicao_formulario}
                            />

                            <div className="mt-7">
                                <div
                                    id="lojista-terms-topo"
                                    ref={termsRef}
                                    aria-hidden={!termsVisible}
                                    className={[
                                        "overflow-hidden bg-white text-[10px] leading-tight text-primary transition-all duration-300",
                                        termsVisible ? "mb-3" : "mb-0",
                                    ].join(" ")}
                                    style={{
                                        maxHeight: termsVisible
                                            ? `${termsRef.current?.scrollHeight ?? 0}px`
                                            : "0px",
                                    }}
                                >
                                    <div className="px-5 py-3">
                                        <p>
                                            Ao enviar, você confirma a
                                            veracidade das informações prestadas
                                            neste formulário, bem como autoriza
                                            a UNICASA a verificar tais dados.
                                            Esteja ciente que o preenchimento de
                                            formulário não implica em nenhum
                                            compromisso para ambas as partes, em
                                            especial, não os obriga à assinatura
                                            de qualquer documento ou
                                            compromisso, sendo as informações
                                            aqui fornecidas meramente cadastrais
                                            e estritamente comerciais. Além
                                            disso, você concorda com a
                                            utilização dos seus dados pela
                                            fabricante e lojas autorizadas. A
                                            Unicasa se compromete a tratar seus
                                            dados pessoais dispostos no
                                            formulário em conformidade com a Lei
                                            Geral de Proteção de Dados, Lei nº
                                            13.709/2018, sendo eliminados de
                                            maneira segura após o tempo
                                            necessário. Para mais informações,
                                            consulte nossa Política de
                                            Privacidade, disponível no site.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <input
                                        id="politica-topo"
                                        type="checkbox"
                                        name="politica"
                                        checked={data.politica}
                                        onChange={handleChange}
                                        aria-required="true"
                                        aria-labelledby="politica-label-topo politica-termos-button-topo politica-conjuncao-topo politica-privacidade-link-topo"
                                        aria-invalid={Boolean(errors.politica)}
                                        aria-describedby={
                                            errors.politica
                                                ? "politica-error-topo"
                                                : undefined
                                        }
                                        className="
                                            relative mt-0.5 size-5 shrink-0
                                            cursor-pointer appearance-none
                                            rounded-full border bg-white
                                            after:absolute after:left-1/2
                                            after:top-1/2 after:size-1/2
                                            after:-translate-x-1/2
                                            after:-translate-y-1/2
                                            after:rounded-full
                                            after:bg-transparent
                                            checked:bg-secondary
                                            checked:hover:bg-secondary
                                            checked:focus:bg-secondary
                                            checked:after:bg-primary
                                            focus:ring-0
                                            focus:ring-offset-0
                                        "
                                    />

                                    <div className="text-xs leading-snug text-primary sm:text-sm">
                                        <label
                                            id="politica-label-topo"
                                            htmlFor="politica-topo"
                                            className="cursor-pointer"
                                        >
                                            Aceito os{" "}
                                        </label>

                                        <button
                                            id="politica-termos-button-topo"
                                            type="button"
                                            aria-expanded={termsVisible}
                                            aria-controls="lojista-terms-topo"
                                            onClick={() => {
                                                setTermsVisible(
                                                    (current) => !current,
                                                );
                                            }}
                                            className="font-bold underline underline-offset-2 transition-opacity hover:opacity-70"
                                        >
                                            Termos de Uso
                                        </button>

                                        <span id="politica-conjuncao-topo">
                                            {" "}
                                            e a{" "}
                                        </span>

                                        <a
                                            id="politica-privacidade-link-topo"
                                            href={route(
                                                "Politicas.privacidade",
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-bold underline underline-offset-2 transition-opacity hover:opacity-70"
                                        >
                                            Política de Privacidade
                                        </a>
                                    </div>
                                </div>

                                <div id="politica-error-topo">
                                    <ErrorMessage field="politica" />
                                </div>
                            </div>

                            {recentlySuccessful && (
                                <Text
                                    as="p"
                                    variant="none"
                                    weight="medium"
                                    role="status"
                                    aria-live="polite"
                                    className="mt-5 text-xs md:text-sm leading-relaxed text-green-700"
                                >
                                    Seus dados foram enviados com sucesso. Nossa
                                    equipe entrará em contato.
                                </Text>
                            )}

                            <button
                                type="submit"
                                disabled={processing}
                                className="
                                    relative mt-7 flex min-h-[54px]
                                    w-fit items-center justify-center
                                    gap-1 sm:gap-3 rounded-[14px] bg-secondary
                                    px-3 md:px-7 text-xs md:text-sm font-semibold
                                    text-primary transition-colors
                                    duration-300 hover:bg-[#f1c000]
                                    disabled:cursor-not-allowed
                                    disabled:opacity-60
                                    max-sm:w-full
                                "
                            >
                                {processing ? (
                                    <>
                                        <span
                                            aria-hidden="true"
                                            className="absolute size-5 animate-spin rounded-full border-2 border-primary/30 border-t-primary"
                                        />

                                        <span className="opacity-0">
                                            Quero falar com a equipe de expansão
                                        </span>
                                    </>
                                ) : (
                                    <span>
                                        Quero falar com a equipe de expansão
                                    </span>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
        </section>
    );
};
