<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Google Tag Manager -->
    <script id="gtm-script">
        (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-WCFTFZF');
    </script>

    <!-- Google Analytics -->
    <script id="gtag-script" async src="https://www.googletagmanager.com/gtag/js?id=UA-176428372-5"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag() {
            window.dataLayer.push(arguments);
        };
        window.gtag('js', new Date());
        window.gtag('config', 'UA-176428372-5');
    </script>

    <link inertia="canonical" rel="canonical" href="https://casabrasileiraplanejados.com.br/sejalojista26/">

    <title inertia>Seja Lojista | Casa Brasileira Móveis Planejados</title>

    <link rel="preload" as="image" href="{{ asset('sejalojista26/imgs/main-bg-mobile-alt.jpg') }}"
        media="(max-width: 767px)" fetchpriority="high">

    <link rel="preload" as="image" href="{{ asset('sejalojista26/imgs/main-bg-desktop-alt.jpg') }}"
        media="(min-width: 768px)" fetchpriority="high">

    <!-- Fonts -->
    <link rel="stylesheet" href="https://use.typekit.net/eil3hdl.css">

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body class="font-sans text-primary antialiased selection:text-white selection:bg-gray-700">
    <!-- Google Tag Manager (noscript) -->
    <noscript id="gtm-noscript">
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WCFTFZF" height="0" width="0"
            style="display:none;visibility:hidden"></iframe>
    </noscript>

    @inertia
</body>

</html>
