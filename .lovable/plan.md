# Plano: Portal Vereador Éder Magrão (frontend)

## O que vamos construir

Uma landing page institucional, mobile-first, para exibir os projetos, trabalhos realizados e lutas do vereador Éder Magrão. A página será uma única rota (`/`) com navegação por âncoras e visual fiel ao protótipo do Google Stitch enviado.

## Decisões confirmadas

- **Estrutura:** página única com rolagem e bottom navigation por âncoras (`#projetos`, `#trabalhos`, `#lutas`).
- **Imagens/vídeos:** manter os placeholders do protótipo por enquanto; substituição por conteúdo real em etapa futura.
- **Backend:** fora de escopo neste momento; apenas frontend estático.

## Estrutura da página

```text
/ (index.tsx)
├── TopAppBar (avatar + nome + menu)
├── Hero Section (foto + "Transparência e Ação" + tagline)
├── Projetos Section
│   ├── Galeria (scroll horizontal de imagens)
│   └── Vídeos recentes (scroll horizontal de thumbnails)
├── Trabalhos Realizados Section
│   ├── Cards de trabalhos (scroll horizontal)
│   └── Acompanhe as Ações (scroll horizontal de vídeos)
├── Lutas Section
│   ├── Grid de lutas (Saúde Pública, Educação)
│   └── Nossa Voz (scroll horizontal de vídeos)
├── Footer (redes sociais + copyright)
└── BottomNavBar (Início, Projetos, Trabalhos, Lutas)
```

## Implementação técnica

1. **Design tokens em `src/styles.css`**
   - Mapear a paleta do `DESIGN.md` para variáveis CSS semânticas e `@theme inline`.
   - Cores principais: primary `#002068`, secondary `#006d40`, tertiary `#d0a600`.
   - Tipografia: `Public Sans` para títulos e corpo, `Inter` para labels.
   - Espaçamento, bordas e sombras conforme as definições do protótipo.

2. **Fontes e ícones em `src/routes/__root.tsx`**
   - Adicionar `<link>` para Google Fonts (Public Sans, Inter).
   - Adicionar `<link>` para Material Symbols Outlined (usado em todo o design).

3. **Página em `src/routes/index.tsx`**
   - Substituir o placeholder atual pelo conteúdo completo.
   - Replicar a composição, hierarquia e micro-interações do `code.html` (scrolls, hovers, badges, gradients).
   - Garantir responsividade: mobile-first, adaptando para desktop.
   - Usar classes semânticas do Tailwind e tokens do projeto, sem hardcoded colors.

4. **Head SEO na página**
   - Título: "Vereador Éder Magrão — Transparência e Ação".
   - Descrição: "Acompanhe os projetos, trabalhos realizados e lutas do vereador Éder Magrão.".
   - Tags `og:title`, `og:description`, `og:type`, `twitter:card`.

## Fora de escopo nesta etapa

- Rotas separadas para `/projetos`, `/trabalhos` ou `/lutas`.
- Banco de dados, CMS, autenticação ou painel administrativo.
- Substituição de imagens/vídeos placeholders por conteúdo real.
- Integração real com WhatsApp, Instagram e YouTube (links serão placeholders).

## Próximo passo

Aprovar este plano para que eu inicie a implementação do frontend.