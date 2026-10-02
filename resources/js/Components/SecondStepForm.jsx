import React, { useEffect, useRef, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { InputMask } from '@react-input/mask';

import { Title } from './ui/Title';
import { Text } from './ui/Text';
import { FormField, FormError } from './ui/FormField';
import { FormSelect } from './ui/FormSelect';
import { FormRadioGroup } from './ui/FormRadioGroup';

const investmentOptions = [
    { value: '4', label: 'Entre R$ 400.000,00 a R$ 500.000,00' },
    { value: '5', label: 'Entre R$ 500.000,00 a R$ 600.000,00' },
    { value: '6', label: 'Entre R$ 600.000,00 a R$ 700.000,00' },
    { value: '7', label: 'Acima de R$ 700.000,00' },
];

const maritalStatusOptions = [
    { value: '1', label: 'Solteiro' },
    { value: '2', label: 'Casado' },
    { value: '3', label: 'Separado' },
    { value: '4', label: 'Divorciado' },
    { value: '5', label: 'Viúvo' },
];

const inputClassName = 'h-[44px] w-full rounded-[10px] border border-[#e8ded3] bg-white px-5 text-sm text-primary placeholder:text-primary/30 outline-none ring-0 transition-colors duration-200 focus:border-primary/60 focus:ring-0';
const textareaClassName = 'min-h-[116px] w-full resize-none rounded-[10px] border border-[#e8ded3] bg-white px-5 py-4 text-sm text-primary placeholder:text-primary/30 outline-none ring-0 transition-colors duration-200 focus:border-primary/60 focus:ring-0';

const ArrowIcon = () => (
    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" aria-hidden="true" className="shrink-0">
        <path d="M4 13.5H22M15.5 7L22 13.5L15.5 20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const SecondStepForm = () => {
    const { token, estados = [] } = usePage().props;

    const termsRef = useRef(null);
    const [termsVisible, setTermsVisible] = useState(false);
    const [showNotice, setShowNotice] = useState(true);

    const { data, setData, post, processing, errors, clearErrors, reset, recentlySuccessful } = useForm({
        nascimento: '',
        naturalidade: '',
        nacionalidade: '',
        cpf: '',
        rg: '',
        expectativa_investimento: '',
        estado_civil: '',
        ocupacao_atual: '',
        empresa: '',
        formacao_escolar: '',
        outra_sociedade: '',
        outra_atividade: '',
        cidade_interesse: '',
        estado_interesse: '',
        conhecimento_marca: '',
        experiencia: '',
        observacoes: '',
        politica: false,
        origem: '',
    });

    useEffect(() => {
        const timer = setTimeout(() => setShowNotice(false), 4500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setData((current) => ({ ...current, origem: params.get('origin') || params.get('utm_source') || '' }));
    }, []);

    const handleChange = ({ target }) => {
        setData(target.name, target.type === 'checkbox' ? target.checked : target.value);
        clearErrors(target.name);
    };

    const handleSelectChange = (name, option) => {
        setData(name, option?.value ?? '');
        clearErrors(name);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        post(route('Lojistas.continuacaoAction', token), {
            preserveScroll: (page) => Object.keys(page.props.errors ?? {}).length > 0,
            onSuccess: () => {
                reset();
                setTermsVisible(false);
            },
        });
    };

    return (
        <section aria-labelledby="second-step-form-title" className="relative bg-white">
            <div
                role="status"
                aria-live="polite"
                className={[
                    'fixed left-1/2 top-20 z-[80] w-[calc(100%-32px)] max-w-[520px] -translate-x-1/2 rounded-[16px] bg-primary px-5 py-4 text-white shadow-[0_18px_50px_rgba(78,54,41,.22)] transition-all duration-500',
                    showNotice ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-4 opacity-0',
                ].join(' ')}
            >
                <Text as="p" variant="none" weight="semibold" className="text-sm leading-snug">
                    Cadastro enviado com sucesso.
                </Text>

                <Text as="p" variant="none" weight="light" className="mt-1 text-xs leading-snug text-white/80">
                    Agora, preencha algumas informações adicionais para complementar seu cadastro.
                </Text>
            </div>

            <div className="container max-w-large">
                <div className="mx-auto mb-10 max-w-[980px]">
                    <Title id="second-step-form-title" as="h1" variant="section" weight="bold" className="text-primary">
                        Informações adicionais
                    </Title>

                    <Text as="p" variant="none" weight="light" className="mt-4 max-w-[620px] text-sm leading-[1.7] text-primary/75 sm:text-base">
                        Complete os dados abaixo para que nossa equipe tenha mais contexto sobre o seu perfil e sua região de interesse.
                    </Text>
                </div>

                <form onSubmit={handleSubmit} noValidate className="mx-auto max-w-[980px] rounded-[28px] bg-[#f5f5f5] p-6 sm:p-8 lg:p-10 xl:px-12">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField id="nascimento" label="Nascimento*" errors={errors}>
                            <InputMask id="nascimento" name="nascimento" mask="__/__/____" replacement={{ _: /\d/ }} value={data.nascimento} onChange={handleChange} placeholder="DD/MM/AAAA" inputMode="numeric" className={inputClassName} />
                        </FormField>

                        <FormField id="naturalidade" label="Naturalidade" errors={errors}>
                            <input id="naturalidade" name="naturalidade" value={data.naturalidade} onChange={handleChange} placeholder="Sua naturalidade" className={inputClassName} />
                        </FormField>

                        <FormField id="nacionalidade" label="Nacionalidade" errors={errors}>
                            <input id="nacionalidade" name="nacionalidade" value={data.nacionalidade} onChange={handleChange} placeholder="Sua nacionalidade" className={inputClassName} />
                        </FormField>

                        <FormField id="cpf" label="CPF*" errors={errors}>
                            <InputMask id="cpf" name="cpf" mask="___.___.___-__" replacement={{ _: /\d/ }} value={data.cpf} onChange={handleChange} placeholder="000.000.000-00" inputMode="numeric" className={inputClassName} />
                        </FormField>

                        <FormField id="rg" label="RG" errors={errors}>
                            <input id="rg" name="rg" value={data.rg} onChange={handleChange} placeholder="Seu RG" className={inputClassName} />
                        </FormField>

                        <FormSelect id="expectativa_investimento" label="Expectativa de investimento*" options={investmentOptions} value={data.expectativa_investimento} errors={errors} onChange={handleSelectChange} />
                        <FormSelect id="estado_civil" label="Estado civil*" options={maritalStatusOptions} value={data.estado_civil} errors={errors} onChange={handleSelectChange} />

                        <FormField id="ocupacao_atual" label="Ocupação atual*" errors={errors}>
                            <input id="ocupacao_atual" name="ocupacao_atual" value={data.ocupacao_atual} onChange={handleChange} placeholder="Sua ocupação atual" className={inputClassName} />
                        </FormField>

                        <FormField id="empresa" label="Empresa" errors={errors}>
                            <input id="empresa" name="empresa" value={data.empresa} onChange={handleChange} placeholder="Empresa" className={inputClassName} />
                        </FormField>

                        <FormField id="formacao_escolar" label="Formação escolar*" errors={errors}>
                            <input id="formacao_escolar" name="formacao_escolar" value={data.formacao_escolar} onChange={handleChange} placeholder="Sua formação" className={inputClassName} />
                        </FormField>

                        <FormRadioGroup name="outra_sociedade" label="Participa de outra sociedade?" value={data.outra_sociedade} errors={errors} onChange={handleChange} />
                        <FormRadioGroup name="outra_atividade" label="Pretende manter outra atividade? Empresa, outro negócio ou consultoria" value={data.outra_atividade} errors={errors} onChange={handleChange} />

                        <FormField id="cidade_interesse" label="Cidade de interesse" errors={errors}>
                            <input id="cidade_interesse" name="cidade_interesse" value={data.cidade_interesse} onChange={handleChange} placeholder="Cidade de interesse" className={inputClassName} />
                        </FormField>

                        <FormSelect id="estado_interesse" label="Estado de interesse*" options={estados} value={data.estado_interesse} errors={errors} onChange={handleSelectChange} searchable />

                        <div className="md:col-span-2">
                            <FormField id="conhecimento_marca" label="Como tomou conhecimento da Casa Brasileira?" errors={errors}>
                                <textarea id="conhecimento_marca" name="conhecimento_marca" value={data.conhecimento_marca} onChange={handleChange} className={textareaClassName} />
                            </FormField>
                        </div>

                        <div className="md:col-span-2">
                            <FormField id="experiencia" label="Tem experiência no ramo moveleiro ou arquitetura? Cite" errors={errors}>
                                <textarea id="experiencia" name="experiencia" value={data.experiencia} onChange={handleChange} className={textareaClassName} />
                            </FormField>
                        </div>

                        <div className="md:col-span-2">
                            <FormField id="observacoes" label="Observações?" errors={errors}>
                                <textarea id="observacoes" name="observacoes" value={data.observacoes} onChange={handleChange} className={textareaClassName} />
                            </FormField>
                        </div>
                    </div>

                    <input type="hidden" name="origem" value={data.origem} />

                    <div className="mt-7">
                        <div
                            id="second-step-terms"
                            ref={termsRef}
                            aria-hidden={!termsVisible}
                            className={['overflow-hidden bg-white text-[10px] leading-tight text-primary transition-all duration-300', termsVisible ? 'mb-3' : 'mb-0'].join(' ')}
                            style={{ maxHeight: termsVisible ? `${termsRef.current?.scrollHeight ?? 0}px` : '0px' }}
                        >
                            <div className="px-5 py-3">
                                <p>
                                    Ao enviar, você confirma a veracidade das informações prestadas neste formulário, bem como autoriza a UNICASA a verificar tais dados. Esteja ciente que o preenchimento de formulário não implica em nenhum compromisso para ambas as partes, em especial, não os obriga à assinatura de qualquer documento ou compromisso, sendo as informações aqui fornecidas meramente cadastrais e estritamente comerciais. A Unicasa se compromete a tratar seus dados pessoais dispostos no formulário em conformidade com a Lei Geral de Proteção de Dados, Lei nº 13.709/2018, sendo eliminados de maneira segura após o tempo necessário. Para mais informações, consulte nossa Política de Privacidade, disponível no site.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <input
                                id="politica"
                                type="checkbox"
                                name="politica"
                                checked={data.politica}
                                onChange={handleChange}
                                className="relative mt-0.5 size-5 shrink-0 cursor-pointer appearance-none rounded-full border-0 bg-secondary after:absolute after:left-1/2 after:top-1/2 after:size-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-transparent checked:bg-secondary checked:after:bg-primary checked:hover:bg-secondary checked:focus:bg-secondary focus:ring-0 focus:ring-offset-0"
                            />

                            <div className="text-xs leading-snug text-primary sm:text-sm">
                                <label htmlFor="politica" className="cursor-pointer">Aceito os </label>

                                <button type="button" aria-expanded={termsVisible} aria-controls="second-step-terms" onClick={() => setTermsVisible((current) => !current)} className="font-bold underline underline-offset-2 transition-opacity hover:opacity-70">
                                    Termos de Uso
                                </button>

                                <span> e a </span>

                                <a href={route('Politicas.privacidade')} target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-2 transition-opacity hover:opacity-70">
                                    Política de Privacidade
                                </a>
                            </div>
                        </div>

                        <FormError errors={errors} field="politica" />
                    </div>

                    {recentlySuccessful && (
                        <Text as="p" variant="none" weight="medium" className="mt-5 text-sm leading-relaxed text-green-700">
                            Informações adicionais enviadas com sucesso.
                        </Text>
                    )}

                    <button
                        type="submit"
                        disabled={processing || !data.politica}
                        className="relative mt-7 flex min-h-[54px] w-fit items-center justify-center gap-3 rounded-[14px] bg-secondary px-7 text-sm font-semibold text-primary transition-colors duration-300 hover:bg-[#f1c000] disabled:cursor-not-allowed disabled:opacity-60 max-sm:w-full"
                    >
                        {processing ? (
                            <>
                                <span className="absolute size-5 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
                                <span className="opacity-0">Enviar informações adicionais</span>
                            </>
                        ) : (
                            <>
                                <ArrowIcon />
                                <span>Enviar informações adicionais</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </section>
    );
};