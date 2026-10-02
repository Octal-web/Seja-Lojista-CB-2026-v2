import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
};

const getCookie = (name) => {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
};

export const CookieModal = ({ acceptCookies, visible }) => {
    const [showModal, setShowModal] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [showSecondStep, setShowSecondStep] = useState(false);
    const [analyticalCookiesEnabled, setAnalyticalCookiesEnabled] = useState(true);
    const [disableCookiesLink, setDisableCookiesLink] = useState('https://support.google.com/chrome/answer/95647?hl=pt');

    useEffect(() => {
        const notifyCookies = getCookie('notify-cookies');
        const rejectCookies = getCookie('reject-cookies');
        if (notifyCookies === '1' || rejectCookies === '1') {
            setShowModal(false);
        }

        const userAgent = navigator.userAgent.toLowerCase();

        if (userAgent.indexOf("firefox") > -1) {
            setDisableCookiesLink("https://support.mozilla.org/pt-BR/kb/disable-third-party-cookies");
        } else if (userAgent.indexOf("chrome") > -1) {
            setDisableCookiesLink("https://support.google.com/chrome/answer/95647?hl=pt");
        } else if (userAgent.indexOf("safari") > -1) {
            setDisableCookiesLink("https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac");
        } else if (userAgent.indexOf("edge") > -1) {
            setDisableCookiesLink("https://support.microsoft.com/pt-br/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09");
        } else {
            setDisableCookiesLink("https://support.google.com/chrome/answer/95647?hl=pt");
        }
    }, []);

    const handleAcceptAllCookies = () => {
        setCookie('notify-cookies', '1', 365);
        setIsFadingOut(true);
        acceptCookies();
        setTimeout(() => {
            setShowModal(false);
        }, 200);
    };

    const handleSelectCookies = () => {
        setShowSecondStep(true);
    };

    const handleAcceptSelected = () => {
        if (analyticalCookiesEnabled) {
            setCookie('notify-cookies', '1', 365);
        } else {
            setCookie('reject-cookies', '1', 365);
        }
        setIsFadingOut(true);
        acceptCookies();
        setTimeout(() => {
            setShowModal(false);
        }, 200);
    };

    const handleRejectNonEssential = () => {
        setCookie('reject-cookies', '1', 365);
        setIsFadingOut(true);
        acceptCookies();
        setTimeout(() => {
            setShowModal(false);
        }, 200);
    };

    const handleBackToFirst = () => {
        setShowSecondStep(false);
    };

    if (!showModal || !visible) {
        return null;
    }

    return (
        <div className={`fixed bottom-0 left-0 right-0 z-[197] ${isFadingOut ? 'animate-fade-out-down' : ''}`}>
            <div className="container max-w-full">
                <div className={`bg-white max-w-5xl mx-auto px-4 sm:px-8 py-4 2xl:py-6 shadow-md mb-10${showSecondStep ? ' animate-fade-in-down' : ''}`}>
                    {!showSecondStep ? (
                        <>
                            <div>
                                <p className="text-xs sm:text-sm text-justify max-sm:leading-tight">
                                    Utilizamos cookies para oferecer uma melhor experiência, melhorar o desempenho, analisar como você interage em nosso site e personalizar conteúdo. Para mais informações acesse nossa{' '}
                                    <Link href={route('Politicas.privacidade')} className="underline">política de privacidade</Link>.
                                </p>
                            </div>
                            <div className="flex flex-col-reverse md:flex-row gap-4 mt-5 justify-center">
                                <button
                                    onClick={handleAcceptAllCookies}
                                    className="block md:w-fit leading-snug text-center py-2.5 px-6 bg-secondary rounded-xl min-w-56 transition-all duration-200 hover:bg-[#f1c000] font-bold pb-3 text-xs sm:text-sm"
                                >
                                    Aceitar todos os cookies
                                </button>
                                
                                <button
                                    onClick={handleSelectCookies}
                                    className="text-xs sm:text-sm underline transition-colors"
                                >
                                    Selecionar cookies
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <h3 className="text-lg font-semibold mb-2 2xl:mb-4 text-center">
                                    Que tipos de cookies utilizamos?
                                </h3>
                                <p className="max-sm:leading-tight mb-4 2xl:mb-6 text-xs sm:text-sm ">
                                    Você pode desabilitar os cookies alterando as configurações do seu navegador, mas saiba que isso pode afetar o funcionamento do site. veja como desabilitar{' '}
                                    <a href={disableCookiesLink} target="_blank" rel="noopener noreferrer" className="underline">aqui</a>.
                                </p>
                                
                                <div className="space-y-2 2xl:space-y-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="font-medium">Cookies necessários</h4>
                                        </div>
                                        <div className="text-sm">
                                            Sempre ativos
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="font-medium">Cookies analíticos</h4>
                                        </div>
                                        <div className="flex items-center">
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={analyticalCookiesEnabled}
                                                    onChange={(e) => setAnalyticalCookiesEnabled(e.target.checked)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex gap-2 sm:gap-3 mt-6 2xl:mt-8">
                                    <button
                                        onClick={handleBackToFirst}
                                        className="max-sm:hidden text-sm underline transition-colors"
                                    >
                                        ← Voltar
                                    </button>
                                    <div className="flex flex-col md:flex-row gap-3 md:ml-auto w-full md:w-fit">
                                        <button
                                            onClick={handleRejectNonEssential}
                                            className="text-xs sm:text-sm max-sm:tracking-tight rounded-xl py-2.5 px-6 border border-gray-300 hover:bg-gray-50 transition-colors"
                                        >
                                            Rejeitar cookies não necessários
                                        </button>
                                        <button
                                            onClick={handleAcceptSelected}
                                            disabled={!analyticalCookiesEnabled}
                                            className="block md:w-fit text-xs sm:text-sm leading-snug text-center py-2.5 px-6 bg-secondary rounded-xl min-w-56 transition-all duration-200 enabled:hover:bg-[#f1c000] font-bold pb-3 disabled:bg-opacity-80"
                                        >
                                            Aceitar todos
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};