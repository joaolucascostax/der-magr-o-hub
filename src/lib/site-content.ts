export type SectionKey = "trabalhos" | "projetos" | "lutas";

export const sectionKeys: SectionKey[] = ["trabalhos", "projetos", "lutas"];

export type HeaderContent = { name: string; avatar_url: string };

export type HeroContent = {
  title_line1: string;
  title_line2: string;
  subtitle: string;
  image_url: string;
  image_alt: string;
};

export type SectionContent = { title: string; subtitle: string; icon: string };

export type FooterContent = {
  name: string;
  description: string;
  copyright: string;
  whatsapp_url: string;
  instagram_url: string;
  youtube_url: string;
};

export type MediaItem = {
  id: string;
  section: SectionKey;
  label: string | null;
  alt: string;
  thumb_url: string;
  video_url: string | null;
  sort_order: number;
};

export type SiteData = {
  header: HeaderContent;
  hero: HeroContent;
  sections: Record<SectionKey, SectionContent>;
  footer: FooterContent;
  media: Record<SectionKey, MediaItem[]>;
};

export const defaultSiteData: SiteData = {
  header: { name: "Magrão da Rádio", avatar_url: "" },
  hero: {
    title_line1: "Trabalho",
    title_line2: "e Compromisso",
    subtitle:
      "Confira toda a jornada e trabalho do candidato à Deputado Estadual Magrão da Rádio.",
    image_url: "",
    image_alt: "Vereador Éder Magrão em atividade com a comunidade",
  },
  sections: {
    trabalhos: {
      title: "Trabalhos Realizados",
      subtitle: "ACOMPANHE NOSSAS LUTAS",
      icon: "track_changes",
    },
    projetos: { title: "Projetos", subtitle: "VÍDEOS DOS PROJETOS", icon: "play_circle" },
    lutas: { title: "Lutas", subtitle: "NOSSA VOZ", icon: "record_voice_over" },
  },
  footer: {
    name: "Vereador Éder Magrão",
    description:
      "Transparência e Trabalho. Acompanhe nossas redes sociais e participe do nosso mandato.",
    copyright: "© 2026 Vereador Éder Magrão. Transparência e Trabalho.",
    whatsapp_url: "#",
    instagram_url: "#",
    youtube_url: "#",
  },
  media: { trabalhos: [], projetos: [], lutas: [] },
};

export const STORAGE_PREFIX = "storage:";

/** Turns a stored reference into a URL the browser can load. */
export function resolveMediaUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith(STORAGE_PREFIX)) {
    return `/api/public/media/${url.slice(STORAGE_PREFIX.length)}`;
  }
  return url;
}

export function buildSiteData(
  contentRows: { key: string; value: unknown }[],
  mediaRows: MediaItem[],
): SiteData {
  const byKey = new Map(contentRows.map((row) => [row.key, row.value as Record<string, unknown>]));
  const merge = <T,>(key: string, fallback: T): T => ({
    ...fallback,
    ...((byKey.get(key) ?? {}) as object),
  });

  const media: Record<SectionKey, MediaItem[]> = { trabalhos: [], projetos: [], lutas: [] };
  for (const item of mediaRows) {
    if (media[item.section]) media[item.section].push(item);
  }
  for (const key of sectionKeys) {
    media[key].sort((a, b) => a.sort_order - b.sort_order);
  }

  return {
    header: merge("header", defaultSiteData.header),
    hero: merge("hero", defaultSiteData.hero),
    sections: {
      trabalhos: merge("section_trabalhos", defaultSiteData.sections.trabalhos),
      projetos: merge("section_projetos", defaultSiteData.sections.projetos),
      lutas: merge("section_lutas", defaultSiteData.sections.lutas),
    },
    footer: merge("footer", defaultSiteData.footer),
    media,
  };
}