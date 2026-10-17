# YOMATIME v2 — Tasks

Site novo do estúdio Yomatime (Lumino, Ticino). Plano completo em `01.md`.
Repositório: https://github.com/HicaroDev/yomatimev2 · Deploy: Vercel (a conectar).
Avisos no Telegram: **0 · 15 · 30 · 50 · 70 · 90 · 100 %** — ou mande `%` a qualquer momento.
Peso de cada fase entre parênteses (soma = 100).

---

## 0. Base (5) ✅
- [x] 0.1 Levantamento do site atual (páginas, preços, contatos, plataforma)
- [x] 0.2 Planejamento em `01.md`
- [x] 0.3 Cérebro do projeto no Obsidian
- [x] 0.4 Esta lista de tasks

## ★ Sprint atual — 3 versões para escolher (pedido 25/09, 23:20)
- [x] A.1 Repo no GitHub + projeto na Vercel conectado
- [x] A.2 Logo transparente (clara/escura), cor da marca menta `#b8d4c6`, 19 fotos otimizadas
- [x] A.3 Conteúdo único em `src/content/yoma.ts` (textos reais, preços, contatos)
- [x] A.4 Home seletora: V1 · V2 · V3
- [x] A.5 **V1 "Luce"** — editorial claro, serifa, molduras em arco (janelas do estúdio), menta + linho
- [x] A.6 **V2 "Respiro"** — imersivo escuro, verde-eucalipto + menta, fotos em tela cheia
- [x] A.7 ~~V3 "Radiate"~~ (reprovada 26/09: "linha game/anime") → **V3 "Firma"**: logo recriado com "time" manuscrito, Bodoni + script, fundo aura (menta/sálvia/champanhe/rosa), parallax
- [x] A.8 Build + teste celular/desktop + push → deploy Vercel
- [x] A.9 Avisar no Telegram com os links
- [x] A.10 Texto-fonte para apresentação no NotebookLM (`apresentacao/`)
- [x] A.12 Fotos reais da biblioteca de mídia dela na galeria + nova foto da Kristina
- [ ] A.13 Avaliações reais (link Google Business ou 3–5 depoimentos) → seção "Dicono di noi"
- [x] A.14 Selfies removidas (pedido 26/09); V1 com botão Prenota fixo + assinatura manuscrita
- [x] A.15 Skill `/yoma-qa` criada e rodada: 13 telas × 3 viewports sem alertas + 16/16 testes de interação
- [x] A.11 Kristina escolhe a versão → **escolheu a V3 "Firma"** (14/10, por áudio). Pediu ajustes:
  - [x] A.16 Tirar os degradês (fundo aura menta/sálvia/champanhe/rosa) da V3 → sobrou só um menta sutil
  - [x] A.17 Tirar/reduzir a tipografia manuscrita (assinatura "time"), deixar mais discreta/suave → só logo + carta da Kristina
  - [x] A.18 V3 virou a home (`/`) direto — seletor V1/V2/V3 removido (14/10, "ela escolheu a três e já estamos mexendo")

## ★ Sprint novo — Painel de controle + integração Magic Heidi (pedido 14/10, por áudio)
- [x] A.19 Painel de controle simples em `/yomapanel` (login por senha única + cookie assinado, protegido por `src/proxy.ts`)
  - Edita: contatos, capa, Lo Studio, bio da Kristina (+ foto), práticas, massagens (preço/texto/foto), tabela de preços, eventos, fotos da capa/galeria, cores da V3
  - Persistência: Upstash Redis (texto/preços/cores) + Vercel Blob (fotos) — **falta configurar na Vercel**, ver A.22
  - Sidebar animado (mesmo componente nos dois painéis, `/yomapanel` e `/yomadesk`)
- [x] A.20b **YomaDesk** — nome escolhido (15/10) pro clone do Magic Heidi, igual nos 3 idiomas
- [x] A.20c MVP do YomaDesk construído em `/yomadesk`: clientes, pacotes de crédito com baixa automática ("Registrar aula", FEFO), faturas simples (rascunho→enviada→paga), importador de CSV de clientes (provisório). Neon Postgres + Drizzle ORM plugados via `.env` (`DATABASE_URL`) e **`npm run db:push` rodado pelo Hícaro (16/10)** — tabelas criadas, YomaDesk funcional de ponta a ponta (testado: `/yomadesk`, `/clientes`, `/faturas`, `/importar` todos 200 sem fallback de "banco não configurado")
- [x] A.20 Visual do `/yomadesk` refinado com base nos prints reais do Magic Heidi (16/10): avatar com iniciais por cliente, badges de status coloridos (rascunho/enviada/paga/vencida/arquivada) na paleta da YomaTime em vez do vermelho do Magic Heidi, fração "pago/total" nas faturas, contagem nos títulos ("Clientes (N)", "Faturas (N)") e cards de estatística com ícone no dashboard. `/admin` virou `/yomapanel` e `/gestao` virou `/yomadesk` (rotas e libs internas renomeadas, mesmo pedido)
- [ ] A.21 Estudar a API/SaaS do Magic Heidi (app.magicheidi.ch) pra importar o histórico de ~177 faturas — falta o Hícaro exportar um CSV real de Clienti/Fatture de lá
- [ ] A.22 Configurar na Vercel: Upstash Redis (env `KV_REST_API_URL`/`KV_REST_API_TOKEN`) + Vercel Blob (env `BLOB_READ_WRITE_TOKEN`) + `ADMIN_PASSWORD` — sem isso o `/yomapanel` funciona só em localhost (modo rascunho em `.data/`, não versionado)

## ★ Sprint novo — Multi-idioma IT/EN/PT (pedido 15/10)
- [x] A.23 Site público (`/`) em 3 idiomas: italiano sem prefixo (padrão), `/en`, `/pt` — tradução inicial de todo o conteúdo de `yoma.ts` (rascunho de boa qualidade, mas a Kristina deveria revisar o tom, principalmente a carta assinada)
- [x] A.24 `/yomapanel` edita o conteúdo nos 3 idiomas (seletor IT/EN/PT no topo, salva os 3 juntos sem perder nenhum)
- [x] A.25 Interface do `/yomapanel` e do `/yomadesk` traduzida (16/10): novo seletor de "idioma do sistema" embaixo da logo na sidebar dos dois (cookie `sistema_locale`, independente do `painel_locale` que controla o idioma do conteúdo), dicionário `src/dictionaries/painel.ts`. Todas as páginas do `/yomadesk` (dashboard, clientes, detalhe do cliente, faturas, importar) e o menu/cabeçalho/"Sair" do `/yomapanel` traduzidos nos 3 idiomas. **Ainda falta** (menor, cosmético): os rótulos internos dos *formulários de conteúdo* do `/yomapanel` (ex. campos de "Contatos", "Lo Studio" etc. — não confundir com o conteúdo em si, que já é 3 idiomas desde A.24)
- [x] A.26 `/v1` e `/v2` continuam só em italiano (decisão: são páginas legadas sem link nenhum apontando pra elas)
- [x] A.27 Regra de multi-idioma "enraizada": skill `yoma-i18n` criada (`~/.claude/skills/yoma-i18n/SKILL.md`) e referenciada no `CLAUDE.md` do projeto — toda tarefa futura que mexer em texto visível passa pelo checklist dela

## ★ Sprint novo — Reskin visual com referência do Stitch (pedido 16/10)
- [x] A.28 Hícaro achou o visual anterior do YomaDesk/painel fraco, pediu pro Stitch (ferramenta de IA)
  recriar e mandou os mockups (`modelo_site/`, gitignored — material de referência, não é código).
  Decisão: usar a estrutura/polimento do Stitch (cards com ícone, busca, abas com contagem, tabela densa)
  mas na **paleta da YomaTime** (avorio/salvia/oro/cipria), não o vermelho/preto genérico "fintech" do
  Stitch nem o conteúdo-molde dele (SSO, Face ID, clientes fictícios tipo Novartis, "SIX Interbank
  Clearing" etc. — tudo isso é filler de SaaS corporativo genérico, não existe neste projeto).
- [x] A.29 `/yomapanel` → nome novo pro antigo `/panel`, combinando com `YomaDesk` (rota + lib
  `panel-auth.ts` → `yomapanel-auth.ts` renomeadas).
- [x] A.30 Reskin visual do `/yomadesk`: busca de clientes **de verdade** (filtra por nome/telefone/
  e-mail, nada decorativo), abas novas "Todos/Com créditos/Sem créditos" (derivadas dos dados, sem
  mudar o schema), cards com `rounded-xl`+sombra suave, inputs/botões arredondados, stat cards do
  dashboard com ícone no canto.
- [x] A.31 Reskin visual do `/yomapanel`: mesmos campos de hoje (nenhum removido/adicionado), só com o
  novo tratamento de card/input/botão arredondado e sombra suave.
- [x] A.32 Login (`/yomapanel/login`) redesenhado: cartão central com selo de ícone, sem as partes
  fictícias do mockup do Stitch (Face ID, Apple ID, SSO, 2FA não existem aqui — é senha única).
- [ ] A.33 **Fora do escopo desta rodada, decisão explícita do Hícaro**: o `/yomapanel` como editor com
  preview ao vivo do site lado a lado (como o Stitch desenhou) fica pra uma tarefa futura — hoje só
  o visual mudou, a navegação por seção + preview em tempo real não foi implementada.
- [x] A.34 Hícaro apontou (16/10, por áudio) que faltou a tela "Selecione o seu destino" do mockup do
  Stitch — ele entendeu que a estrutura toda (não só cores/cards) devia vir, e reclamou que essa parte da
  aprovação não ficou clara. Implementado: nova página `/yomapanel/selecionar` (cards YomaDesk/Painel,
  mesma sessão/senha única pra ambos) — vira o destino padrão do login quando não há `next` explícito
  (antes caía direto em `/yomapanel`), e um ícone "trocar área" foi adicionado na sidebar e no header
  mobile de `/yomadesk` e `/yomapanel` pra sempre dar pra voltar à seleção. 3 idiomas (IT/EN/PT).
- [x] A.35 **Redesign estrutural** (16/10 à noite, por áudio) — Hícaro reagiu forte ("parece que foi
  feito por uma criança") ao reskin anterior, que só trocou cor/cantos sem trazer a estrutura real do
  Stitch. Entrou em modo de planejamento antes de codar de novo. Entregue:
  - Fonte **Geist** (`next/font/google`) carregada no layout raiz — projeto não tinha nenhuma fonte
    customizada antes, só o stack padrão do navegador (provável causa do visual "amador").
  - Rotas simplificadas pro topo: `/yomapanel/login` → **`/login`**, `/yomapanel/selecionar` →
    **`/selecionar`** (redirects 307 dos caminhos antigos mantidos em `next.config.ts`).
  - `/login`: fundo de foto real do estúdio (`studio-sala.jpg`) com overlay, header/footer finos,
    card de vidro central — sem 2FA/SSO/Face ID (não existem aqui).
  - `/selecionar`: cada cartão (YomaDesk/Painel) ganhou selo de ícone maior, divisor, checklist de
    3 itens **reais** (ex. YomaDesk: Clientes/Pacotes de crédito/Faturas) e botão CTA de largura total.
  - Sidebar (`/yomadesk` e `/yomapanel`): itens de navegação ganharam **badge de contagem real**
    (nunca número fictício — Clientes/Faturas no YomaDesk), rodapé trocou o botão de texto solto por
    um padrão de perfil fixo (avatar genérico + "Equipe" + logout).
  - Header fixo (`sticky`) por página no `/yomadesk` e no `/yomapanel` — título + ação principal.
  - `/yomadesk/clientes`: lista virou **tabela** de verdade (colunas Cliente/Créditos/ação), e o
    cadastro de cliente saiu do card inline pro **painel lateral deslizante** (via `?novo=1` na URL,
    sem JS novo — mesmo padrão dos filtros `q`/`aba` que já existiam).
  - **Ainda fora do escopo** (não revisitado, decisão de A.33 continua valendo): o `/yomapanel` como
    editor com preview ao vivo em 3 colunas.
- [x] A.36 Hícaro testou o A.35 e aprovou a estrutura ("a estrutura ficou bom"), mas pediu pra ir além:
  não só a estrutura do Stitch, mas o **visual de verdade** de um dos 4 guias de estilo dele — escolheu
  **"Luminescent Glass"** (claro, glassmorphism estilo macOS). Implementado no `/yomadesk`, `/yomapanel`,
  `/login` e `/selecionar` (site público **não** foi tocado — continua na paleta V3 avorio/salvia/oro):
  - Novos tokens no `globals.css` (`--color-vidro`, `--color-carmesim` acento primário `#dc2626`,
    `--color-grafite` texto, `--color-acento-azul`/`--color-acento-indigo` pra variedade) + uma classe
    de escopo `.vidro` que sobrescreve só os tokens semânticos (`background`/`foreground`/`muted`/
    `border`/`ring`) dentro dessas 4 áreas, sem afetar o site público.
  - Vidro de verdade: sidebar e cards com `backdrop-blur` + transparência (`bg-white/65`...`/90` por
    camada, conforme o guia), sombras difusas em vez de sombra dura, inputs com fundo translúcido e
    blur, painel lateral de cliente e card de login como "vidro nível 3" (mais opaco/blur, como modal).
  - Acento carmesim usado com moderação (CTA, foco, estado ativo), não em todo lugar — "paga" nas
    faturas virou verde (sucesso), já que o guia não define verde e vermelho pra "pago" seria confuso.
  - Avatares e stat cards do dashboard recoloridos com as cores reais do guia (não inventadas).
- [x] A.37 **YomaDeskV2** (16/10, madrugada) — Hícaro mandou 6 mockups novos
  (`modelo_site/yomadeskv2/`) e pediu funcionalidades novas de verdade, não só visual. Modo de
  planejamento de novo (2 agentes: leitura a fundo dos mockups + do backend atual). Entregue:
  - **Schema novo**: `empresa`, `contasBancarias`, `itensCatalogo`, `categoriasDespesa`, `despesas`,
    `configuracaoFatura` (tabelas novas) + `faturas.vencimentoEm` e 7 colunas fiscais em `clientes`
    (rua/numero/cep/cidade/uidIde/notaPrivada/portalB2bHabilitado).
  - **A minha empresa** (`/yomadesk/empresa`): dados fiscais + taxa de IVA suíça (8.1/2.6/3.8/isenta)
    + contas bancárias QR-IBAN + categorias de despesa, em abas.
  - **Itens** (`/yomadesk/itens`): catálogo de serviços/produtos/taxas com CRUD.
  - **Despesas** (`/yomadesk/despesas`): registro com upload de recibo real (reaproveita o padrão de
    Blob do `enviarFoto`) — **sem IA/OCR fake**, o mockup também só simulava isso.
  - **Boleto QR suíço de verdade**: instalada a lib `swissqrbill` + `pdfkit`; rota
    `/yomadesk/faturas/[id]/qrbill` gera um PDF com fatura + QR-Bill oficial ISO 20022 a partir dos
    dados da empresa/conta bancária/cliente.
  - **Análises** (`/yomadesk/analises`): faturamento por mês, top clientes, faturas por status — dados
    reais, sem gráfico inventado (o mockup não detalhava essa tela).
  - **Personalizar fatura** (`/yomadesk/personalizar`): logo, anexo PDF, mensagens, nome da conta QR,
    referência de pagamento, prazo de vencimento.
  - **Faturas**: cards de total faturado/a aguardar/vencidas (reais) + coluna de vencimento + botão
    de baixar QR-Bill por fatura.
  - **Cadastro de cliente**: campos fiscais novos (endereço completo, UID/IDE suíço opcional).
  - Corrigido `tabelaNaoExiste()` (`src/lib/yomadesk/db.ts`) pra também reconhecer coluna faltando
    (42703), não só tabela faltando (42P01) — necessário porque `faturas` e `clientes` ganharam
    colunas novas em tabelas que já existiam.
  - **Fora do escopo, com motivo documentado**: convidar equipe/múltiplos usuários (exigiria repensar
    toda a autenticação, hoje senha única); IA/OCR real pra ler recibo (precisaria de API paga não
    configurada); portal do cliente B2B (o checkbox existe mas sem lógica real por trás no próprio
    mockup — construir o portal seria um app novo inteiro).
  - **Pendente de você**: rodar `npm run db:push` de novo pra criar as tabelas/colunas novas — até lá,
    as telas novas mostram o aviso "tabelas ainda não existem" (verificado por curl).
- [x] A.38 Hícaro instalou o plugin Claude in Chrome e eu consegui, pela primeira vez nesta sessão, ver
  o site de verdade renderizado (antes só validava por curl, sem ver a tela). Comparei "A minha
  empresa" direto com o `code.html` original do mockup (que ele mandou o caminho local) e achei
  diferenças reais: cards com padding apertado (`p-5` em vez de `p-8`), inputs baixos e com canto
  pequeno (sem `h-11`/`rounded-xl`), vidro sem o efeito de borda dupla (clara em cima, escura embaixo)
  e sem `saturate(180%)` no blur, opções de IVA como lista de rádio solta em vez de cartões
  selecionáveis, categorias como pills soltas em vez de grade com ícone. Corrigido:
  - `globals.css`: classes `.vidro-card` e `.vidro-input` com a especificação exata do mockup
    (incluindo a borda dupla e o `saturate`). **Correção posterior (A.39)**: o gradiente de fundo que
    adicionei aqui foi removido — o mockup de verdade (renderizado, não só o `screenshot.png`) também
    tem fundo liso, então o gradiente era uma invenção minha, não fidelidade ao original.
  - `/yomadesk/empresa` reconstruída com os cartões/tiles de IVA e grade de categorias fiéis ao
    mockup; mesma classe nova aplicada em todas as outras telas do YomaDesk/Painel.
  - Achado um bug de porta: outro servidor seu ("StudioIntake") também escuta a porta 3000, e o
    Chrome às vezes resolvia `localhost:3000` pra ele em vez do meu. Resolvido movendo o servidor de
    desenvolvimento pra porta 4000 (`npm run dev -- -p 4000`).
  - Confirmado visualmente (não só por classe CSS) que o resultado bate muito mais com o mockup.
- [x] A.39 Hícaro pediu uma segunda checagem direta contra `code.html` (não a screenshot) de "A minha
  empresa". Servi a pasta do mockup localmente (`npx serve`) pra renderizar o `code.html` de verdade
  no navegador — não só ler o código — e comparei tela a tela. Achados e correções:
  - Fundo do mockup de verdade é liso (sem gradiente) — removido o gradiente inventado do A.38.
  - Seção de IVA no mockup é um **acordeão recolhido por padrão** (clique pra abrir), com uma frase
    de ajuda abaixo de cada opção (ex. "Padrão para produtos, serviços e consultoria geral na
    Suíça.") — eu tinha deixado sempre aberto e sem as frases. Implementado com `<details>/<summary>`
    nativo do HTML (sem JS novo) + as 3 frases de ajuda nos 3 idiomas.
  - Card de contas bancárias tinha o badge "QR-IBAN Pronto" que eu não tinha copiado — adicionado.
  - Decisão mantida: **não** copiei o selo "CHF Swiss Certified" (afirma uma certificação que a
    YomaTime não tem de verdade) nem a aba "Contas Bancárias QR-IBAN" avançada do mockup (ela só
    duplica as mesmas 2 contas fictícias com outro estilo — não é uma funcionalidade distinta, só
    decoração extra da demo).
- [x] A.40 Hícaro apontou por áudio, depois de ver os prints, que o conteúdo ainda não batia:
  posição/alinhamento diferente, "div centralizada" em vez de grudada à esquerda, menu "Definições"
  sem o recuo certo. Achado o bug real: o wrapper `mx-auto max-w-5xl`/`max-w-4xl` em
  `yomadesk/layout.tsx` e `yomapanel/page.tsx` estava centralizando **cabeçalho + conteúdo juntos**,
  enquanto no mockup só o corpo é limitado em largura (`max-w-4xl`, sem `mx-auto` — fica grudado à
  esquerda, com a sobra de espaço à direita) e o cabeçalho (`<header>`) ocupa a largura toda, sem
  limite. Corrigido:
  - Removido o `mx-auto` dos dois layouts; `PageHeader` (`src/components/PageHeader.tsx`) não precisa
    mais da margem negativa (`-mx-4`/`-mx-8`) que cancelava o padding do wrapper que não existe mais.
  - Adicionado `max-w-4xl` (sem `mx-auto`) no `<div>` de corpo de cada página do YomaDesk/Painel —
    mantém a largura do mockup, mas sem centralizar.
  - Sidebar: o submenu "Definições" ganhou a indentação com linha à esquerda (`ml-4 pl-3 border-l`),
    igual ao mockup, em `YomaDeskNav.tsx`.
  - Pedido do Hícaro (por áudio): terminar o YomaDesk primeiro, só depois voltar a mexer no Painel —
    a correção acima foi aplicada nos dois porque era o mesmo bug de layout, mas nenhum ajuste
    adicional de Painel foi feito além disso.
  - Confirmado com print mandado pro Hícaro comparar com o mockup.
- [x] A.41 (17/10) Hícaro mandou o `screen.png` do mockup de "Nova Despesa"
  (`modelo_site/yomadeskv2/yomadesk_gest_o_de_despesas/`) e apontou que a tela real não chegava nem
  perto — com razão: a tela de Despesas nunca tinha recebido a reconstrução de verdade (só o CSS
  genérico `.vidro-card`/`.vidro-input` tinha sido aplicado na rodada do A.37, não o layout específico
  do mockup — eu já tinha avisado isso antes, mas só virou óbvio quando o Hícaro comparou de verdade).
  - Construída `/yomadesk/despesas/nova` do zero: header com voltar/badge "Rascunho"/toggle
    PAGO-A PAGAR/chip "Uma vez"/botão "Salvar", 2 colunas (comprovante à esquerda, "Detalhes da
    transação" à direita com preço grande em CHF, descrição, método+data, categoria, fornecedor,
    tags) — igual à proporção e aos campos do mockup.
  - Removi de propósito (e avisei o motivo): o texto "OCR automático / IA preenche os dados" (não
    existe IA/OCR no projeto — vira upload real de comprovante), o dropdown de recorrência "Uma vez"
    (fica só visual, sem campo de despesa recorrente no schema) e o rodapé fake de "sincronizado na
    nuvem / editado há 2 min" (trocado por "rascunho ainda não salvo", honesto pra uma despesa nova).
  - `despesas/page.tsx` virou só lista + botão "Nova despesa" (tirei o formulário inline antigo).
  - Verificado de verdade: screenshot da tela renderizada comparado elemento por elemento com o
    `screen.png` do mockup (não só bati o olho), testei preencher + salvar + aparecer na lista + apagar
    via navegador. `tsc --noEmit`, `npm run lint` e `npm run build` limpos.
  - Lição pra próxima vez: quando várias telas de um mockup ficam pendentes de verificação (eu já
    tinha avisado isso no A.37), preciso entregar essa lista de pendências de forma explícita e visível
    pro Hícaro, não só mencionar de passagem — esperar ele achar o problema sozinho custa confiança.
- [x] A.42 (17/10) Pedido do Hícaro: conferir TODOS os 6 mockups do YomaDeskV2 antes de PCD. Ao
  conferir, achei que 5 dos 6 (Despesas, Itens, Criar cliente, Gestão de faturas, Personalizar
  fatura) usam uma identidade visual diferente da que eu tinha aplicado — "YomaDesk / Swiss
  Enterprise", ícones Material Symbols, tokens de cor específicos — e só "A minha empresa" usava a
  "Luminescent Glass" antiga. Perguntei; o Hícaro escolheu adotar "Swiss Enterprise" como identidade
  oficial do YomaDesk. Feito:
  - Sidebar (`yomadesk/layout.tsx`, `YomaDeskNav.tsx`): logo virou um quadrado carmesim com ícone +
    "YomaDesk" + subtítulo "Swiss Enterprise" (novo `marcaSubtitulo` no dicionário, mesmo texto nos 3
    idiomas, como já é "YomaDesk"); todos os ícones de menu trocados pros nomes do Material Symbols
    usados nos mockups (receipt_long, account_balance_wallet, analytics, groups, inventory_2, etc).
  - Trocado **todo** ícone lucide-react do YomaDesk (10 arquivos: layout, nav, dashboard, clientes,
    despesas, despesas/nova, empresa, faturas, itens) pelo novo componente `MaterialIcon`
    (`src/components/MaterialIcon.tsx`) — fonte carregada só dentro de `/yomadesk` via `<link>` no
    layout (não pesa no site público). Mantive o lucide-react intocado no kit vendorizado
    `animated-sidebar.tsx` (risco desnecessário mexer lá).
  - Conferindo os mockups achei **2 funcionalidades mortas** que nunca tinham sido ligadas a nenhuma
    tela: `atualizarItemCatalogo`/`removerItemCatalogo` (Itens não tinha editar/remover — criei
    `ItemRow.tsx`, edição inline na própria linha da tabela) e as colunas de cabeçalho de Faturas
    (`colFatura`/`colCliente`/`colEmissao`/etc já existiam no dicionário, mas a tela renderizava uma
    lista em `<div>`, sem usar os cabeçalhos — virou uma `<table>` de verdade com as mesmas colunas do
    mockup "Gestão de faturas", mais ícone em cada stat card).
  - "Personalizar fatura" já tinha todos os campos certos (só não tinha sido comparado antes) — só
    adicionei os ícones por seção, iguais aos do mockup.
  - "Criar cliente" (modelo mostra página cheia; nós usamos um drawer lateral) — mantive o drawer:
    tem todos os campos reais do mockup (endereço, UID/IDE, nota privada, portal B2B), só não é uma
    página cheia — arquitetura diferente, mesmo conteúdo, decisão deliberada pra não duplicar padrão.
  - Fiquei de fora de propósito: seletor de idioma FR/DE/EN por cliente (mockup mostra, não existe
    campo no schema), dropdown de recorrência de despesa (mockup mostra "Uma vez ▾", fica só visual).
  - Verificado com `tsc --noEmit`, `npm run lint` (só os erros pré-existentes de `_ref/*.js`) e
    `npm run build` limpos, e screenshot de cada tela (Dashboard, A minha empresa + 3 abas, Despesas +
    Nova despesa, Itens com editar/remover testado de ponta a ponta, Faturas, Personalizar fatura,
    Clientes + drawer) comparado com o mockup ou com o padrão já estabelecido.
  - A skill `/yoma-qa` existente audita o **site público** (V1/V2/V3 em produção), não o YomaDesk — não
    se aplica a essa rodada. Fica pendente, se o Hícaro quiser, rascunhar uma skill de QA própria do
    YomaDesk/mockups (ele já tinha levantado essa ideia no A.39).

## 1. Conteúdo e marca (12)
- [x] 1.1 Extrair todos os textos das páginas atuais (Home, Lo Studio, Corsi, Reformer, Massaggi, Galleria, Contatti)
- [x] 1.2 Baixar fotos e logo atuais (provisórios)
- [ ] 1.3 Pedir à Kristina: fotos novas, logo em vetor, grade de horários
- [ ] 1.4 Você gera o mockup e me apresenta
- [ ] 1.5 Definir paleta, fontes e tokens (anti-cara-de-IA)
- [ ] 1.6 Responder as perguntas em aberto (reserva, idiomas, domínio)

## 2. Setup (10)
- [ ] 2.1 Conectar o repositório na Vercel (**precisa de você**)
- [ ] 2.2 Next.js + TypeScript + Tailwind no repo `yomatimev2`
- [ ] 2.3 Tokens de design + fontes
- [ ] 2.4 Layout base: cabeçalho, menu mobile, rodapé
- [ ] 2.5 Primeiro deploy de preview

## 3. Páginas (30)
- [ ] 3.1 Home
- [ ] 3.2 Lo Studio (Kristina, história, filosofia)
- [ ] 3.3 Corsi di gruppo (Yoga/Pilates + horário semanal)
- [ ] 3.4 Pilates Reformer
- [ ] 3.5 Massaggi
- [ ] 3.6 Prezzi (abas Gruppo · Reformer · Massaggi)
- [ ] 3.7 Galleria
- [ ] 3.8 Eventi (banho sonoro, meditação)
- [ ] 3.9 Contatti (mapa, WhatsApp, formulário)
- [ ] 3.10 Privacy / Impressum

## 4. Reserva e contato (10)
- [ ] 4.1 Botão WhatsApp com mensagem pronta por serviço
- [ ] 4.2 Formulário de contato por e-mail
- [ ] 4.3 Plataforma de reserva (se decidido)
- [ ] 4.4 Vale-presente (buono regalo) — pedido por WhatsApp/e-mail

## 5. SEO e desempenho (8)
- [ ] 5.1 Metadados, Open Graph, favicon
- [ ] 5.2 schema.org LocalBusiness / HealthAndBeautyBusiness
- [ ] 5.3 Sitemap + robots
- [ ] 5.4 Redirects das URLs antigas do WordPress
- [ ] 5.5 Lighthouse ≥ 95 no celular

## 6. QA e design (15)
- [x] 6.1 Criar skill `yoma-qa` (baseada no `fatto-qa`)
- [ ] 6.2 Criar skill `yoma-designer` (baseada no `fatto-designer`)
- [x] 6.3 Rodada de QA celular + desktop
- [x] 6.4 Correções da rodada
- [ ] 6.5 Revisão com você e com a cliente

## 7. Lançamento (10)
- [ ] 7.1 Apontar domínio yomatime.ch para a Vercel
- [ ] 7.2 Conferir e-mail/WhatsApp/formulário em produção
- [ ] 7.3 Atualizar Google Business e links do Instagram/Facebook
- [ ] 7.4 Registrar no cérebro e entregar

---

**Progresso: 30 %** — 3 versões no ar para escolha (25/09)
