import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import { getSiteData } from "@/lib/site-content.functions";
import {
  resolveMediaUrl,
  type FooterContent,
  type HeaderContent,
  type HeroContent,
  type MediaItem,
  type SectionContent,
  type SiteData,
} from "@/lib/site-content";

export const Route = createFileRoute("/")({
  loader: () => getSiteData(),
  head: () => ({
    meta: [
      { title: "Vereador Éder Magrão — Trabalho e Compromisso" },
      {
        name: "description",
        content:
          "Acompanhe os projetos, trabalhos realizados e lutas do vereador Éder Magrão. Transparência e trabalho por uma cidade melhor.",
      },
      {
        property: "og:title",
        content: "Vereador Éder Magrão — Trabalho e Compromisso",
      },
      {
        property: "og:description",
        content:
          "Acompanhe os projetos, trabalhos realizados e lutas do vereador Éder Magrão. Transparência e trabalho por uma cidade melhor.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const data = Route.useLoaderData() as SiteData;

  return (
    <div className="min-h-screen bg-background pb-28 pt-16 text-on-background antialiased">
      <TopAppBar header={data.header} />
      <main className="flex flex-col gap-10">
        <HeroSection hero={data.hero} />
        <TrabalhosSection items={data.media.trabalhos} section={data.sections.trabalhos} />
        <ProjetosSection items={data.media.projetos} section={data.sections.projetos} />
        <LutasSection items={data.media.lutas} section={data.sections.lutas} />
      </main>
      <Footer footer={data.footer} />
      <BottomNavBar />
    </div>
  );
}

function TopAppBar({ header }: { header: HeaderContent }) {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-outline-variant/50 bg-surface/90 shadow-sm backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-16 w-full max-w-container-max items-center justify-between px-margin-mobile md:px-margin-desktop">
        <div className="group flex items-center gap-3">
          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-primary/10 bg-surface-variant shadow-sm">
            {header.avatar_url ? (
              <img
                alt={`Foto de ${header.name}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                src={resolveMediaUrl(header.avatar_url)}
              />
            ) : null}
          </div>
          <h1 className="font-display text-xl font-bold tracking-tight text-primary">
            {header.name}
          </h1>
        </div>
        <button
          aria-label="Menu"
          className="flex items-center justify-center rounded-full p-2 text-on-surface-variant transition-all hover:bg-surface-container-high hover:text-primary active:scale-95"
          type="button"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </header>
  );
}

function HeroSection({ hero }: { hero: HeroContent }) {
  return (
    <section className="relative isolate -mt-16 flex h-[65vh] w-full flex-col justify-end overflow-hidden rounded-b-3xl text-left shadow-lg">
      <div className="absolute inset-0 -z-10">
        {hero.image_url ? (
          <img
            alt={hero.image_alt}
            className="h-full w-full object-cover"
            src={resolveMediaUrl(hero.image_url)}
          />
        ) : (
          <div className="h-full w-full bg-primary" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>
      <div className="relative z-10 flex flex-col gap-4 px-margin-mobile pb-16 pt-32 md:px-margin-desktop">
        <h2 className="font-display text-[44px] font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-md">
          <span className="block font-light opacity-90">{hero.title_line1}</span>
          <span className="block">{hero.title_line2}</span>
        </h2>
        <p className="max-w-sm whitespace-pre-line font-body text-lg font-medium text-primary-fixed-dim drop-shadow-sm">
          {hero.subtitle}
        </p>
      </div>
    </section>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-8 w-1.5 rounded-full bg-gradient-to-b from-primary to-secondary" />
      <h3 className="font-display text-headline-lg-mobile font-extrabold tracking-tight text-primary md:text-headline-lg">
        {title}
      </h3>
    </div>
  );
}

function VideoCarousel({
  icon,
  items,
  subtitle,
}: {
  icon: string;
  items: MediaItem[];
  subtitle: string;
}) {
  const [playingId, setPlayingId] = useState<string | null>(null);

  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-5">
      <h4 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-primary">
        <span className="material-symbols-outlined text-lg">{icon}</span>
        {subtitle}
      </h4>
      <div className="hide-scrollbar -mx-margin-mobile flex snap-x snap-mandatory gap-4 overflow-x-auto px-margin-mobile pb-6 pt-2 md:mx-0 md:px-0">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative h-56 w-44 flex-shrink-0 cursor-pointer snap-center overflow-hidden rounded-2xl bg-surface-variant shadow-md"
            onClick={() => item.video_url && setPlayingId(item.id)}
          >
            {item.video_url && playingId === item.id ? (
              <video
                autoPlay
                className="h-full w-full object-cover"
                controls
                playsInline
                poster={resolveMediaUrl(item.thumb_url)}
                src={resolveMediaUrl(item.video_url)}
              />
            ) : (
              <>
                <img
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={resolveMediaUrl(item.thumb_url)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/20 shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                    <span
                      className="material-symbols-outlined text-3xl text-white"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      play_arrow
                    </span>
                  </div>
                </div>
                {item.label ? (
                  <span className="absolute bottom-3 left-3 text-sm font-bold uppercase tracking-wider text-white drop-shadow-lg">
                    {item.label}
                  </span>
                ) : null}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjetosSection({
  items,
  section,
}: {
  items: MediaItem[];
  section: SectionContent;
}) {
  return (
    <section
      className="relative flex flex-col gap-8 px-margin-mobile md:px-margin-desktop"
      id="projetos"
    >
      <div className="absolute -right-10 -top-10 -z-10 h-32 w-32 rounded-full bg-primary-fixed/30 blur-3xl" />
      <SectionHeading title={section.title} />
      <VideoCarousel icon={section.icon} items={items} subtitle={section.subtitle} />
    </section>
  );
}

function TrabalhosSection({
  items,
  section,
}: {
  items: MediaItem[];
  section: SectionContent;
}) {
  return (
    <div className="relative w-full bg-gradient-to-b from-surface-container-low to-surface py-16">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(var(--color-primary) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <section
        className="relative z-10 flex flex-col gap-8 px-margin-mobile md:px-margin-desktop"
        id="trabalhos"
      >
        <SectionHeading title={section.title} />
        <VideoCarousel icon={section.icon} items={items} subtitle={section.subtitle} />
      </section>
    </div>
  );
}

function LutasSection({ items, section }: { items: MediaItem[]; section: SectionContent }) {
  return (
    <section
      className="relative flex flex-col gap-8 px-margin-mobile md:px-margin-desktop"
      id="lutas"
    >
      <SectionHeading title={section.title} />
      <VideoCarousel icon={section.icon} items={items} subtitle={section.subtitle} />
    </section>
  );
}

function Footer({ footer }: { footer: FooterContent }) {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(Boolean(data.session)));
    const { data } = supabase.auth.onAuthStateChange((_event, session) =>
      setSignedIn(Boolean(session)),
    );
    return () => data.subscription.unsubscribe();
  }, []);

  const socialLinks = [
    { icon: "chat", label: "WhatsApp", href: footer.whatsapp_url },
    { icon: "photo_camera", label: "Instagram", href: footer.instagram_url },
    { icon: "smart_display", label: "YouTube", href: footer.youtube_url },
  ];

  return (
    <footer className="mt-12 flex w-full flex-col items-center gap-6 border-t border-outline-variant/30 bg-surface-container-high px-margin-mobile py-12 pb-24 text-center md:px-margin-desktop">
      <div className="mb-2 h-1 w-12 rounded-full bg-gradient-to-r from-primary to-secondary" />
      <p className="font-display text-[22px] font-extrabold text-primary">{footer.name}</p>
      <p className="max-w-sm font-body text-base font-medium text-on-surface-variant">
        {footer.description}
      </p>
      <div className="mt-6 flex gap-8">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            className="group flex flex-col items-center gap-2 text-on-surface-variant transition-all duration-300 hover:text-primary"
            href={link.href || "#"}
            rel="noreferrer"
            target="_blank"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface shadow-sm transition-colors group-hover:bg-primary/10 group-hover:text-primary">
              <span className="material-symbols-outlined text-2xl">{link.icon}</span>
            </div>
            <span className="font-label text-xs font-medium tracking-wide">{link.label}</span>
          </a>
        ))}
      </div>
      <div className="my-4 h-px w-full max-w-[200px] bg-outline-variant/30" />
      <p className="whitespace-pre-line font-body text-xs text-on-surface-variant/80">
        {footer.copyright}
      </p>
      <Link
        className="font-label text-xs font-medium text-on-surface-variant/70 underline-offset-4 hover:text-primary hover:underline"
        to={signedIn ? "/admin" : "/auth"}
      >
        {signedIn ? "Painel administrativo" : "Área restrita"}
      </Link>
    </footer>
  );
}

const navItems = [
  { href: "#", icon: "home", label: "Início", active: true },
  { href: "#trabalhos", icon: "handyman", label: "Trabalhos" },
  { href: "#projetos", icon: "account_balance", label: "Projetos" },
  { href: "#lutas", icon: "campaign", label: "Lutas" },
];

function BottomNavBar() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 flex h-20 w-full items-center justify-around border-t border-outline-variant/30 bg-surface/95 px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] backdrop-blur-md pb-safe">
      {navItems.map((item) => {
        const isActive = item.active;
        return (
          <a
            key={item.label}
            className={`flex flex-col items-center justify-center gap-1 rounded-xl px-5 py-2 transition-all duration-200 active:scale-95 ${
              isActive
                ? "bg-secondary-container text-on-secondary-container shadow-sm"
                : "text-on-surface-variant hover:text-primary"
            }`}
            href={item.href}
          >
            <span
              className="material-symbols-outlined text-xl"
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {item.icon}
            </span>
            <span className="font-label text-[10px] font-bold tracking-wide">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
