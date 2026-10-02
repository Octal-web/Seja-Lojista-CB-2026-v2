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

export const StoreForm = () => {
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
        cep: "",
        politica: false,
        expectativa_investimento: "",
        possui_socio: "",
        cargo: "",

        origem: "",
        campanha: "",
        grupo: "",
        anuncio: "",
        entrada: "",
        posicao_formulario: "Rodapé",
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

    useFormTracking("rodape", data, [
        "nome",
        "telefone",
        "email",
        "cep",
        "cargo",
        "expectativa_investimento",
        "possui_socio",
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
                    "cep",
                    "politica",
                    "expectativa_investimento",
                    "possui_socio",
                    "cargo",
                );

                setTermsVisible(false);
            },
        });
    };

    const inputClassName = `
        h-[44px] w-full rounded-[10px]
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
            id="orcamento-rodape"
            aria-labelledby="lojista-form-title-rodape"
            className="bg-white py-20 sm:py-24 xl:pb-32 2xl:pb-40"
        >
            <div className="container max-w-large">
                <div className="grid grid-cols-1 gap-4 md:gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16 2xl:gap-24">
                    <div
                        ref={contentRef}
                        className="2xl:max-w-[530px] opacity-0"
                    >
                        <Title
                            id="lojista-form-title-rodape"
                            as="h2"
                            variant="none"
                            weight="thin"
                            className="text-[30px] leading-[1.08] text-primary sm:text-[44px] xl:text-[50px]"
                        >
                            Está avaliando
                            <span className="ml-2 2xl:ml-0 2xl:block">
                                abrir uma loja?
                            </span>
                        </Title>

                        <div
                            id="lojista-form-description-rodape"
                            className="mt-4 md:mt-9 2xl:max-w-[470px] space-y-3 lg:space-y-6"
                        >
                            <Text
                                as="p"
                                variant="none"
                                weight="light"
                                className="text-xs sm:text-sm leading-[1.7] text-primary/80 md:text-base"
                            >
                                Faça parte de uma rede construída para
                                transformar oportunidades em negócios sólidos e
                                duradouros.
                            </Text>

                            <Text
                                as="p"
                                variant="none"
                                weight="light"
                                className="text-xs sm:text-sm leading-[1.7] text-primary/80 md:text-base"
                            >
                                Preencha seus dados e descubra se sua região
                                está disponível para expansão.
                            </Text>
                        </div>
                    </div>

                    <div ref={formWrapperRef} className="opacity-0">
                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            aria-labelledby="lojista-form-title-rodape"
                            aria-describedby="lojista-form-description-rodape"
                            aria-busy={processing}
                            className="rounded-[28px] bg-[#F6F6F6] p-3 md:p-6 sm:p-8 lg:p-10 xl:px-12"
                            id="form_CB_Sejalojista26'_rodape"
                        >
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label
                                        htmlFor="nome-rodape"
                                        className="mb-2 block text-xs md:text-sm font-normal text-primary"
                                    >
                                        Nome*
                                    </label>

                                    <input
                                        id="nome-rodape"
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
                                                ? "nome-error-rodape"
                                                : undefined
                                        }
                                        className={inputClassName}
                                    />

                                    <div id="nome-error-rodape">
                                        <ErrorMessage field="nome" />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="telefone-rodape"
                                        className="mb-2 block text-xs md:text-sm font-normal text-primary"
                                    >
                                        Telefone*
                                    </label>

                                    <InputMask
                                        id="telefone-rodape"
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
                                                ? "telefone-error-rodape"
                                                : undefined
                                        }
                                        className={inputClassName}
                                    />

                                    <div id="telefone-error-rodape">
                                        <ErrorMessage field="telefone" />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="telefone_confirmation-rodape"
                                        className="mb-2 block text-xs md:text-sm font-normal text-primary"
                                    >
                                        Confirme seu telefone*
                                    </label>

                                    <InputMask
                                        id="telefone_confirmation-rodape"
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
                                                ? "telefone_confirmation-error-rodape"
                                                : undefined
                                        }
                                        className={inputClassName}
                                    />

                                    <div id="telefone_confirmation-error-rodape">
                                        <ErrorMessage field="telefone_confirmation" />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="email-rodape"
                                        className="mb-2 block text-xs md:text-sm font-normal text-primary"
                                    >
                                        E-mail*
                                    </label>

                                    <input
                                        id="email-rodape"
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
                                                ? "email-error-rodape"
                                                : undefined
                                        }
                                        className={inputClassName}
                                    />

                                    <div id="email-error-rodape">
                                        <ErrorMessage field="email" />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="cep-rodape"
                                        className="mb-2 block text-xs md:text-sm font-normal text-primary"
                                    >
                                        CEP*
                                    </label>

                                    <InputMask
                                        id="cep-rodape"
                                        type="text"
                                        name="cep"
                                        mask="_____-___"
                                        replacement={{
                                            _: /\d/,
                                        }}
                                        value={data.cep}
                                        onChange={handleChange}
                                        placeholder="Seu CEP"
                                        inputMode="numeric"
                                        autoComplete="postal-code"
                                        aria-required="true"
                                        aria-invalid={Boolean(errors.cep)}
                                        aria-describedby={
                                            errors.cep ? "cep-error-rodape" : undefined
                                        }
                                        className={inputClassName}
                                    />

                                    <div id="cep-error-rodape">
                                        <ErrorMessage field="cep" />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="cargo-rodape"
                                        className="mb-2 block text-xs md:text-sm font-normal text-primary"
                                    >
                                        Profissão*
                                    </label>

                                    <input
                                        id="cargo-rodape"
                                        type="text"
                                        name="cargo"
                                        value={data.cargo}
                                        onChange={handleChange}
                                        placeholder="Sua profissão"
                                        aria-required="true"
                                        aria-invalid={Boolean(errors.cargo)}
                                        aria-describedby={
                                            errors.cargo
                                                ? "cargo-error-rodape"
                                                : undefined
                                        }
                                        className={inputClassName}
                                    />

                                    <div id="cargo-error-rodape">
                                        <ErrorMessage field="cargo" />
                                    </div>
                                </div>
                                <FormSelect
                                    id="expectativa_investimento-rodape"
                                    name="expectativa_investimento"
                                    label="Qual o seu orçamento disponível para investir?*"
                                    options={investmentOptions}
                                    value={data.expectativa_investimento}
                                    errors={errors}
                                    onChange={handleSelectChange}
                                />
                                <FormSelect
                                    id="possui_socio-rodape"
                                    name="possui_socio"
                                    label="Você terá um sócio investidor?*"
                                    options={partnerOptions}
                                    value={data.possui_socio}
                                    errors={errors}
                                    onChange={handleSelectChange}
                                />
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
                                    id="lojista-terms-rodape"
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
                                        id="politica-rodape"
                                        type="checkbox"
                                        name="politica"
                                        checked={data.politica}
                                        onChange={handleChange}
                                        aria-required="true"
                                        aria-labelledby="politica-label-rodape politica-termos-button-rodape politica-conjuncao-rodape politica-privacidade-link-rodape"
                                        aria-invalid={Boolean(errors.politica)}
                                        aria-describedby={
                                            errors.politica
                                                ? "politica-error-rodape"
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
                                            id="politica-label-rodape"
                                            htmlFor="politica-rodape"
                                            className="cursor-pointer"
                                        >
                                            Aceito os{" "}
                                        </label>

                                        <button
                                            id="politica-termos-button-rodape"
                                            type="button"
                                            aria-expanded={termsVisible}
                                            aria-controls="lojista-terms-rodape"
                                            onClick={() => {
                                                setTermsVisible(
                                                    (current) => !current,
                                                );
                                            }}
                                            className="font-bold underline underline-offset-2 transition-opacity hover:opacity-70"
                                        >
                                            Termos de Uso
                                        </button>

                                        <span id="politica-conjuncao-rodape">
                                            {" "}
                                            e a{" "}
                                        </span>

                                        <a
                                            id="politica-privacidade-link-rodape"
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

                                <div id="politica-error-rodape">
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
                                            Quero saber mais como funciona!
                                        </span>
                                    </>
                                ) : (
                                    <span>
                                        Quero saber mais como funciona!
                                    </span>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
