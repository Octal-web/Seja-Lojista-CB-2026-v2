{{--
    resources/views/sejalojista26'-bot.blade.php

    View HTML estática servida exclusivamente para crawlers e IAs de busca.
    Usuários normais NUNCA veem esta página — eles recebem o React via Inertia.

    Esta view contém:
    - Todo o conteúdo textual da página /sejalojista26' indexável
    - Schemas JSON-LD: FAQPage, Organization, WebPage
    - Meta tags completas para SEO e compartilhamento social
    - Markup semântico limpo para leitura por IAs (GEO)

    Atualize o conteúdo aqui sempre que atualizar a página React.
--}}
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ $title }}</title>
    <meta name="description" content="{{ $description }}">

    {{-- Canonical --}}
    <link rel="canonical" href="https://casabrasileiraplanejados.com.br/sejalojista26/">

    {{-- Robots --}}
    <meta name="robots" content="index, follow">
    <meta name="author" content="Octal Web">

    {{-- Open Graph --}}
    <meta property="og:url"         content="https://casabrasileiraplanejados.com.br/sejalojista26/">
    <meta property="og:type"        content="website">
    <meta property="og:title"       content="{{ $title }}">
    <meta property="og:description" content="{{ $description }}">
    <meta property="og:image"       content="https://casabrasileiraplanejados.com.br/content/pages/casabrasileira.jpg">
    <meta property="og:locale"      content="pt_BR">
    <meta property="og:site_name"   content="Casa Brasileira Móveis Planejados">

    {{-- Twitter Card --}}
    <meta name="twitter:card"        content="summary_large_image">
    <meta name="twitter:title"       content="{{ $title }}">
    <meta name="twitter:description" content="{{ $description }}">
    <meta name="twitter:image"       content="https://casabrasileiraplanejados.com.br/content/pages/casabrasileira.jpg">

    {{-- Facebook domain verification --}}
    <meta name="facebook-domain-verification" content="d5uzppfozm4eujrlltl5d0yihf95p2">

    {{-- ===== Structured Data ===== --}}

    {{-- FAQPage — formato mais citado pelas IAs de busca --}}
    <script type="application/ld+json">
    {
        "@@context": "https://schema.org",
        "@@type": "FAQPage",
        "mainEntity": [
            {
                "@@type": "Question",
                "name": "A Casa Brasileira é uma franquia?",
                "acceptedAnswer": {
                    "@@type": "Answer",
                    "text": "Não. A Casa Brasileira não é uma franquia. Trabalhamos com um sistema de lojas autorizadas do Grupo Unicasa — empresa de capital aberto listada na B3 (Novo Mercado). Isso significa que não há cobrança de royalties nem taxas mensais sobre o faturamento do lojista."
                }
            },
            {
                "@@type": "Question",
                "name": "Quanto custa abrir uma loja Casa Brasileira?",
                "acceptedAnswer": {
                    "@@type": "Answer",
                    "text": "O investimento varia conforme o tamanho e localização do showroom. A marca oferece suporte completo na implantação, incluindo orientação para o projeto do espaço físico. Entre em contato com a equipe de expansão para receber uma proposta personalizada para a sua região."
                }
            },
            {
                "@@type": "Question",
                "name": "Como funciona o suporte para o novo lojista?",
                "acceptedAnswer": {
                    "@@type": "Answer",
                    "text": "A Casa Brasileira oferece suporte completo desde a implantação: treinamentos para a equipe, acesso à extranet da marca com materiais e ferramentas, apoio em marketing e campanhas nacionais, além de suporte técnico e comercial contínuo."
                }
            },
            {
                "@@type": "Question",
                "name": "Há exclusividade territorial para o lojista?",
                "acceptedAnswer": {
                    "@@type": "Answer",
                    "text": "Sim. Cada lojista autorizado tem exclusividade na sua região de atuação. A Casa Brasileira realiza um mapa de expansão criterioso para garantir que as lojas não concorram entre si e que cada território tenha potencial adequado para o negócio."
                }
            },
            {
                "@@type": "Question",
                "name": "Quem fabrica os móveis da Casa Brasileira?",
                "acceptedAnswer": {
                    "@@type": "Answer",
                    "text": "Os móveis são fabricados pela Unicasa Indústria de Móveis S/A, com fábrica em Bento Gonçalves (RS) — polo moveleiro do Brasil. A Unicasa é a primeira empresa do setor a ter capital aberto na Bolsa de Valores (B3, Novo Mercado), o que garante padrões rigorosos de qualidade e transparência corporativa."
                }
            },
            {
                "@@type": "Question",
                "name": "Qual é a garantia dos produtos Casa Brasileira?",
                "acceptedAnswer": {
                    "@@type": "Answer",
                    "text": "Os móveis Casa Brasileira possuem 5 anos de garantia, com acompanhamento integral via token digital que permite ao cliente rastrear o pedido e ao lojista gerenciar o pós-venda com eficiência."
                }
            },
            {
                "@@type": "Question",
                "name": "Qual o perfil ideal para ser um lojista Casa Brasileira?",
                "acceptedAnswer": {
                    "@@type": "Answer",
                    "text": "O programa busca empresários e investidores com perfil empreendedor, capital disponível para abertura e operação do showroom, interesse no mercado de móveis planejados e alinhamento com os valores da marca. Experiência no varejo é bem-vinda, mas não obrigatória."
                }
            },
            {
                "@@type": "Question",
                "name": "Como faço para me tornar um lojista Casa Brasileira?",
                "acceptedAnswer": {
                    "@@type": "Answer",
                    "text": "O primeiro passo é entrar em contato com a equipe de expansão através do formulário disponível na página Seja Lojista do site casabrasileiraplanejados.com.br/sejalojista26/. A equipe avaliará o seu perfil, a disponibilidade territorial na sua região e iniciará o processo de seleção."
                }
            }
        ]
    }
    </script>

    {{-- Organization — conecta a entidade da marca para as IAs --}}
    <script type="application/ld+json">
    {
        "@@context": "https://schema.org",
        "@@type": "Organization",
        "name": "Casa Brasileira Móveis Planejados",
        "url": "https://casabrasileiraplanejados.com.br",
        "logo": {
            "@@type": "ImageObject",
            "url": "https://casabrasileiraplanejados.com.br/site/img/logo-main.png"
        },
        "email": "atendimento@@casabrasileiraplanejados.com.br",
        "sameAs": [
            "https://www.facebook.com/casabrasileiraoficial",
            "https://www.instagram.com/casabrasileiraoficial",
            "https://www.youtube.com/@@CasaBrasileiraPlanejados"
        ],
        "parentOrganization": {
            "@@type": "Organization",
            "name": "Unicasa Indústria de Móveis S/A",
            "url": "https://unicasa.com.br",
            "description": "Primeira empresa do setor moveleiro listada na B3 (Novo Mercado). Fabricante das marcas Dell Anno, New e Casa Brasileira. Fundada em 1985, com fábrica em Bento Gonçalves (RS)."
        }
    }
    </script>

    {{-- WebPage — descreve esta página especificamente --}}
    <script type="application/ld+json">
    {
        "@@context": "https://schema.org",
        "@@type": "WebPage",
        "name": "Seja Lojista Casa Brasileira",
        "url": "https://casabrasileiraplanejados.com.br/sejalojista26/",
        "description": "{{ $description }}",
        "inLanguage": "pt-BR",
        "isPartOf": {
            "@@type": "WebSite",
            "name": "Casa Brasileira Móveis Planejados",
            "url": "https://casabrasileiraplanejados.com.br"
        },
        "about": {
            "@@type": "Thing",
            "name": "Programa de expansão de lojas autorizadas Casa Brasileira"
        },
        "mainEntity": {
            "@@type": "Service",
            "name": "Loja Autorizada Casa Brasileira",
            "provider": {
                "@@type": "Organization",
                "name": "Casa Brasileira Móveis Planejados"
            },
            "description": "Modelo de loja autorizada para comercialização de móveis planejados Casa Brasileira. Sem royalties, com suporte completo de implantação e exclusividade territorial.",
            "areaServed": {
                "@@type": "Country",
                "name": "Brasil"
            }
        }
    }
    </script>

    <style>
        /* Estilos mínimos — esta página não é exibida para usuários */
        body { font-family: sans-serif; max-width: 900px; margin: 0 auto; padding: 2rem; color: #1a1a1a; line-height: 1.6; }
        h1 { font-size: 2rem; margin-bottom: 1rem; }
        h2 { font-size: 1.4rem; margin-top: 2rem; }
        h3 { font-size: 1.1rem; margin-top: 1.5rem; }
        p, li { font-size: 1rem; }
        ul { padding-left: 1.5rem; }
        .faq-item { margin-bottom: 1.5rem; border-bottom: 1px solid #eee; padding-bottom: 1.5rem; }
        .faq-item:last-child { border-bottom: none; }
    </style>
</head>
<body>

<header>
    <a href="https://casabrasileiraplanejados.com.br">
        <img src="https://casabrasileiraplanejados.com.br/site/img/logo-main.png"
             alt="Casa Brasileira Móveis Planejados"
             width="200">
    </a>
</header>

<main>

    <h1>Seja Lojista Casa Brasileira</h1>

    <p>
        A Casa Brasileira abre suas portas para que você faça parte da realização de
        muitos e muitos sonhos. Ser lojista da Casa Brasileira é fazer parte de uma rede
        de pessoas comprometidas com a perpetuação do seu negócio, com a evolução da marca
        e com a obtenção dos melhores resultados para os envolvidos.
    </p>

    {{-- ===== Sobre a marca ===== --}}
    <section aria-labelledby="sobre-marca">
        <h2 id="sobre-marca">Sobre a Casa Brasileira</h2>

        <p>
            A Casa Brasileira surgiu com o propósito de oferecer uma identidade bem brasileira
            aos lares de todo o país. É a marca de móveis planejados mais conectada com a
            essência do Brasil — especialista em criar lares aconchegantes, inspiradores e em
            perfeita harmonia com o jeito brasileiro de viver.
        </p>

        <p>
            Com mais de quatro décadas de atuação no segmento moveleiro, a
            <strong>Unicasa Indústria de Móveis S/A</strong> — detentora das marcas
            Dell Anno, New Móveis e Casa Brasileira — é referência em tecnologia,
            alta produtividade e excelência em qualidade.
        </p>

        <p>
            A Unicasa abriu seu capital em 2012 no segmento de
            <strong>Novo Mercado da B3</strong>, o mais alto e exigente nível de
            governança corporativa do Brasil. Sua fábrica em Bento Gonçalves (RS) conta
            com mais de 50 mil m² de área construída e capacidade para mais de
            2,2 milhões de módulos por ano.
        </p>
    </section>

    {{-- ===== Diferenciais do modelo ===== --}}
    <section aria-labelledby="diferenciais">
        <h2 id="diferenciais">Por que ser um lojista Casa Brasileira?</h2>

        <ul>
            <li>
                <strong>Sem royalties e sem taxas mensais</strong> — não é uma franquia.
                O modelo de loja autorizada garante que a margem do lojista não seja
                comprometida por custos fixos sobre o faturamento.
            </li>
            <li>
                <strong>Exclusividade territorial</strong> — cada lojista tem exclusividade
                na sua região, com um mapa de expansão criterioso que protege o negócio.
            </li>
            <li>
                <strong>Suporte completo desde a implantação</strong> — treinamentos para
                a equipe, acesso à extranet da marca, materiais de comunicação e suporte
                técnico e comercial contínuo.
            </li>
            <li>
                <strong>5 anos de garantia</strong> nos produtos, com acompanhamento via
                token digital que facilita o pós-venda e fortalece a relação com o cliente final.
            </li>
            <li>
                <strong>Marca com identidade forte</strong> — a Casa Brasileira é inspirada
                na cultura brasileira e conectada ao universo de design e decoração de alto padrão.
            </li>
            <li>
                <strong>Grupo Unicasa listado na B3</strong> — segurança corporativa e
                transparência financeira para o lojista parceiro.
            </li>
        </ul>
    </section>

    {{-- ===== Suporte e implantação ===== --}}
    <section aria-labelledby="suporte">
        <h2 id="suporte">Suporte e implantação</h2>

        <p>
            A Casa Brasileira oferece um programa completo de suporte para novos lojistas:
        </p>

        <ul>
            <li>Orientação para projeto e montagem do showroom</li>
            <li>Treinamentos técnicos e comerciais para a equipe de vendas</li>
            <li>Acesso à extranet com catálogos, tabelas de preços e materiais de campanha</li>
            <li>Apoio em campanhas de marketing nacionais e regionais</li>
            <li>Suporte técnico pós-venda com rastreamento por token digital</li>
        </ul>
    </section>

    {{-- ===== Mapa de expansão ===== --}}
    <section aria-labelledby="expansao">
        <h2 id="expansao">Mapa de expansão</h2>

        <p>
            A Casa Brasileira realiza um processo criterioso de expansão territorial.
            Há vagas disponíveis em diversas regiões do Brasil. Entre em contato com
            a equipe de expansão para verificar a disponibilidade na sua cidade.
        </p>

        <p>
            <a href="https://casabrasileiraplanejados.com.br/sejalojista26/#orcamento">
                Fale com a equipe de expansão →
            </a>
        </p>
    </section>

    {{-- ===== FAQ ===== --}}
    <section aria-labelledby="faq">
        <h2 id="faq">Perguntas frequentes</h2>

        <div class="faq-item">
            <h3>A Casa Brasileira é uma franquia?</h3>
            <p>
                Não. A Casa Brasileira não é uma franquia. Trabalhamos com um sistema de
                lojas autorizadas do Grupo Unicasa — empresa de capital aberto listada na B3
                (Novo Mercado). Isso significa que <strong>não há cobrança de royalties nem
                taxas mensais</strong> sobre o faturamento do lojista.
            </p>
        </div>

        <div class="faq-item">
            <h3>Quanto custa abrir uma loja Casa Brasileira?</h3>
            <p>
                O investimento varia conforme o tamanho e localização do showroom.
                A marca oferece suporte completo na implantação, incluindo orientação para
                o projeto do espaço físico. Entre em contato com a equipe de expansão para
                receber uma proposta personalizada para a sua região.
            </p>
        </div>

        <div class="faq-item">
            <h3>Como funciona o suporte para o novo lojista?</h3>
            <p>
                A Casa Brasileira oferece suporte completo desde a implantação: treinamentos
                para a equipe, acesso à extranet da marca com materiais e ferramentas, apoio
                em marketing e campanhas nacionais, além de suporte técnico e comercial contínuo.
            </p>
        </div>

        <div class="faq-item">
            <h3>Há exclusividade territorial para o lojista?</h3>
            <p>
                Sim. Cada lojista autorizado tem exclusividade na sua região de atuação.
                A Casa Brasileira realiza um mapa de expansão criterioso para garantir que
                as lojas não concorram entre si e que cada território tenha potencial adequado
                para o negócio.
            </p>
        </div>

        <div class="faq-item">
            <h3>Quem fabrica os móveis da Casa Brasileira?</h3>
            <p>
                Os móveis são fabricados pela <strong>Unicasa Indústria de Móveis S/A</strong>,
                com fábrica em Bento Gonçalves (RS) — polo moveleiro do Brasil. A Unicasa é
                a primeira empresa do setor a ter capital aberto na Bolsa de Valores (B3,
                Novo Mercado), garantindo padrões rigorosos de qualidade e transparência
                corporativa.
            </p>
        </div>

        <div class="faq-item">
            <h3>Qual é a garantia dos produtos Casa Brasileira?</h3>
            <p>
                Os móveis Casa Brasileira possuem <strong>5 anos de garantia</strong>,
                com acompanhamento integral via token digital que permite ao cliente
                rastrear o pedido e ao lojista gerenciar o pós-venda com eficiência.
            </p>
        </div>

        <div class="faq-item">
            <h3>Qual o perfil ideal para ser um lojista Casa Brasileira?</h3>
            <p>
                O programa busca empresários e investidores com perfil empreendedor,
                capital disponível para abertura e operação do showroom, interesse no
                mercado de móveis planejados e alinhamento com os valores da marca.
                Experiência no varejo é bem-vinda, mas não obrigatória.
            </p>
        </div>

        <div class="faq-item">
            <h3>Como faço para me tornar um lojista Casa Brasileira?</h3>
            <p>
                O primeiro passo é entrar em contato com a equipe de expansão através
                do formulário disponível nesta página. A equipe avaliará o seu perfil,
                a disponibilidade territorial na sua região e iniciará o processo de seleção.
            </p>
            <p>
                <a href="https://casabrasileiraplanejados.com.br/sejalojista26/#orcamento">
                    Iniciar conversa com a equipe →
                </a>
            </p>
        </div>
    </section>

</main>

<footer>
    <p>
        <a href="https://casabrasileiraplanejados.com.br">Casa Brasileira Móveis Planejados</a> —
        Grupo Unicasa — CNPJ: consulte o site oficial.
    </p>
    <p>
        <a href="https://casabrasileiraplanejados.com.br/sejalojista26/politica-de-privacidade">Política de privacidade</a> |
        <a href="https://casabrasileiraplanejados.com.br/sejalojista26/politica-de-cookies">Política de cookies</a>
    </p>
</footer>

</body>
</html>
