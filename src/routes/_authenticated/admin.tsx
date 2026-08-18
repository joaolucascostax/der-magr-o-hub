import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { uploadMedia } from "@/lib/media-upload";
import {
  buildSiteData,
  resolveMediaUrl,
  sectionKeys,
  type MediaItem,
  type SectionKey,
  type SiteData,
} from "@/lib/site-content";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Painel de conteúdo — Magrão da Rádio" },
      {
        name: "description",
        content: "Gerencie textos, fotos e vídeos das seções do portal do vereador Éder Magrão.",
      },
      { property: "og:title", content: "Painel de conteúdo — Magrão da Rádio" },
      {
        property: "og:description",
        content: "Gerencie textos, fotos e vídeos das seções do portal do vereador Éder Magrão.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
  errorComponent: ({ error }) => (
    <div className="p-8 font-body text-on-surface">Erro ao carregar o painel: {error.message}</div>
  ),
});

async function fetchSiteData(): Promise<SiteData> {
  const [content, media] = await Promise.all([
    supabase.from("site_content").select("key, value"),
    supabase
      .from("media_items")
      .select("id, section, label, alt, thumb_url, video_url, sort_order")
      .order("sort_order", { ascending: true }),
  ]);
  if (content.error) throw content.error;
  if (media.error) throw media.error;
  return buildSiteData(content.data, media.data as MediaItem[]);
}

const sectionLabels: Record<SectionKey, string> = {
  trabalhos: "Trabalhos",
  projetos: "Projetos",
  lutas: "Lutas",
};

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({ queryKey: ["site-data"], queryFn: fetchSiteData });

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-surface-container-low pb-20">
      <header className="sticky top-0 z-20 border-b border-outline-variant/40 bg-surface/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-5 py-4">
          <div>
            <h1 className="font-display text-xl font-extrabold text-primary">Painel de conteúdo</h1>
            <p className="font-body text-xs text-on-surface-variant">
              Edite os textos, fotos e vídeos do site
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" variant="outline">
              <Link to="/">Ver site</Link>
            </Button>
            <Button onClick={handleSignOut} size="sm" variant="ghost">
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-8">
        {isLoading ? (
          <p className="font-body text-sm text-on-surface-variant">Carregando conteúdo…</p>
        ) : error || !data ? (
          <p className="font-body text-sm text-on-surface-variant">
            Não foi possível carregar o conteúdo.
          </p>
        ) : (
          <Tabs className="w-full" defaultValue="geral">
            <TabsList className="mb-6 flex w-full flex-wrap">
              <TabsTrigger value="geral">Textos e fotos</TabsTrigger>
              {sectionKeys.map((key) => (
                <TabsTrigger key={key} value={key}>
                  {sectionLabels[key]}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="geral">
              <GeneralEditor data={data} />
            </TabsContent>
            {sectionKeys.map((key) => (
              <TabsContent key={key} value={key}>
                <MediaEditor items={data.media[key]} section={key} />
              </TabsContent>
            ))}
          </Tabs>
        )}
      </main>
    </div>
  );
}

function Panel({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section className="mb-6 rounded-2xl border border-outline-variant/40 bg-surface p-6 shadow-sm">
      <h2 className="mb-4 font-display text-base font-bold text-primary">{title}</h2>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  multiline,
  onChange,
  value,
}: {
  label: string;
  multiline?: boolean;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      {multiline ? (
        <Textarea onChange={(event) => onChange(event.target.value)} rows={3} value={value} />
      ) : (
        <Input onChange={(event) => onChange(event.target.value)} value={value} />
      )}
    </div>
  );
}

function MediaField({
  accept,
  label,
  onChange,
  value,
}: {
  accept: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    try {
      onChange(await uploadMedia(file));
      toast.success("Arquivo enviado. Não esqueça de salvar.");
    } catch (uploadError) {
      toast.error(uploadError instanceof Error ? uploadError.message : "Falha no envio.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <div className="flex flex-wrap items-center gap-3">
        {value ? (
          accept.startsWith("video") ? (
            <video className="h-20 w-20 rounded-lg object-cover" src={resolveMediaUrl(value)} />
          ) : (
            <img
              alt=""
              className="h-20 w-20 rounded-lg object-cover"
              src={resolveMediaUrl(value)}
            />
          )
        ) : null}
        <Input
          accept={accept}
          className="max-w-xs"
          disabled={uploading}
          onChange={(event) => handleFile(event.target.files?.[0])}
          type="file"
        />
        {value ? (
          <Button onClick={() => onChange("")} size="sm" type="button" variant="ghost">
            Remover
          </Button>
        ) : null}
      </div>
      <Input
        onChange={(event) => onChange(event.target.value)}
        placeholder="ou cole um link"
        value={value}
      />
    </div>
  );
}

function GeneralEditor({ data }: { data: SiteData }) {
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState(data);
  const [saving, setSaving] = useState(false);

  useEffect(() => setDraft(data), [data]);

  async function save() {
    setSaving(true);
    try {
      const rows = [
        { key: "header", value: draft.header },
        { key: "hero", value: draft.hero },
        { key: "section_trabalhos", value: draft.sections.trabalhos },
        { key: "section_projetos", value: draft.sections.projetos },
        { key: "section_lutas", value: draft.sections.lutas },
        { key: "footer", value: draft.footer },
      ];
      const { error } = await supabase.from("site_content").upsert(rows, { onConflict: "key" });
      if (error) throw error;
      await queryClient.invalidateQueries({ queryKey: ["site-data"] });
      toast.success("Conteúdo salvo!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível salvar.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <Panel title="Cabeçalho">
        <Field
          label="Nome exibido"
          onChange={(value) => setDraft({ ...draft, header: { ...draft.header, name: value } })}
          value={draft.header.name}
        />
        <MediaField
          accept="image/*"
          label="Foto do perfil"
          onChange={(value) =>
            setDraft({ ...draft, header: { ...draft.header, avatar_url: value } })
          }
          value={draft.header.avatar_url}
        />
      </Panel>

      <Panel title="Topo da página (Hero)">
        <Field
          label="Título — 1ª linha"
          onChange={(value) => setDraft({ ...draft, hero: { ...draft.hero, title_line1: value } })}
          value={draft.hero.title_line1}
        />
        <Field
          label="Título — 2ª linha"
          onChange={(value) => setDraft({ ...draft, hero: { ...draft.hero, title_line2: value } })}
          value={draft.hero.title_line2}
        />
        <Field
          label="Descrição"
          multiline
          onChange={(value) => setDraft({ ...draft, hero: { ...draft.hero, subtitle: value } })}
          value={draft.hero.subtitle}
        />
        <MediaField
          accept="image/*"
          label="Foto de fundo"
          onChange={(value) => setDraft({ ...draft, hero: { ...draft.hero, image_url: value } })}
          value={draft.hero.image_url}
        />
        <Field
          label="Descrição da foto (acessibilidade)"
          onChange={(value) => setDraft({ ...draft, hero: { ...draft.hero, image_alt: value } })}
          value={draft.hero.image_alt}
        />
      </Panel>

      {sectionKeys.map((key) => (
        <Panel key={key} title={`Seção ${sectionLabels[key]}`}>
          <Field
            label="Título da seção"
            onChange={(value) =>
              setDraft({
                ...draft,
                sections: { ...draft.sections, [key]: { ...draft.sections[key], title: value } },
              })
            }
            value={draft.sections[key].title}
          />
          <Field
            label="Subtítulo do carrossel"
            onChange={(value) =>
              setDraft({
                ...draft,
                sections: { ...draft.sections, [key]: { ...draft.sections[key], subtitle: value } },
              })
            }
            value={draft.sections[key].subtitle}
          />
        </Panel>
      ))}

      <Panel title="Rodapé e redes sociais">
        <Field
          label="Nome"
          onChange={(value) => setDraft({ ...draft, footer: { ...draft.footer, name: value } })}
          value={draft.footer.name}
        />
        <Field
          label="Descrição"
          multiline
          onChange={(value) =>
            setDraft({ ...draft, footer: { ...draft.footer, description: value } })
          }
          value={draft.footer.description}
        />
        <Field
          label="Texto de copyright"
          onChange={(value) => setDraft({ ...draft, footer: { ...draft.footer, copyright: value } })}
          value={draft.footer.copyright}
        />
        <Field
          label="Link do WhatsApp"
          onChange={(value) =>
            setDraft({ ...draft, footer: { ...draft.footer, whatsapp_url: value } })
          }
          value={draft.footer.whatsapp_url}
        />
        <Field
          label="Link do Instagram"
          onChange={(value) =>
            setDraft({ ...draft, footer: { ...draft.footer, instagram_url: value } })
          }
          value={draft.footer.instagram_url}
        />
        <Field
          label="Link do YouTube"
          onChange={(value) =>
            setDraft({ ...draft, footer: { ...draft.footer, youtube_url: value } })
          }
          value={draft.footer.youtube_url}
        />
      </Panel>

      <div className="sticky bottom-4 flex justify-end">
        <Button disabled={saving} onClick={save} size="lg">
          {saving ? "Salvando…" : "Salvar alterações"}
        </Button>
      </div>
    </div>
  );
}

function MediaEditor({ items, section }: { items: MediaItem[]; section: SectionKey }) {
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState(false);

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["site-data"] });

  async function addItem() {
    setBusy(true);
    const { error } = await supabase.from("media_items").insert({
      section,
      alt: "Novo item",
      thumb_url: "",
      sort_order: items.length,
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    await refresh();
  }

  async function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    setBusy(true);
    const a = items[index]!;
    const b = items[target]!;
    await supabase.from("media_items").update({ sort_order: target }).eq("id", a.id);
    await supabase.from("media_items").update({ sort_order: index }).eq("id", b.id);
    setBusy(false);
    await refresh();
  }

  return (
    <div>
      {items.length === 0 ? (
        <p className="mb-4 font-body text-sm text-on-surface-variant">
          Nenhum item nesta seção ainda.
        </p>
      ) : null}

      {items.map((item, index) => (
        <MediaItemCard
          canMoveDown={index < items.length - 1}
          canMoveUp={index > 0}
          busy={busy}
          item={item}
          key={item.id}
          onMoveDown={() => move(index, 1)}
          onMoveUp={() => move(index, -1)}
          onChanged={refresh}
        />
      ))}

      <Button disabled={busy} onClick={addItem} variant="outline">
        Adicionar item
      </Button>
    </div>
  );
}

function MediaItemCard({
  busy,
  canMoveDown,
  canMoveUp,
  item,
  onChanged,
  onMoveDown,
  onMoveUp,
}: {
  busy: boolean;
  canMoveDown: boolean;
  canMoveUp: boolean;
  item: MediaItem;
  onChanged: () => Promise<unknown>;
  onMoveDown: () => void;
  onMoveUp: () => void;
}) {
  const [draft, setDraft] = useState(item);
  const [saving, setSaving] = useState(false);

  useEffect(() => setDraft(item), [item]);

  async function save() {
    setSaving(true);
    const { error } = await supabase
      .from("media_items")
      .update({
        label: draft.label?.trim() ? draft.label.trim() : null,
        alt: draft.alt,
        thumb_url: draft.thumb_url,
        video_url: draft.video_url?.trim() ? draft.video_url.trim() : null,
      })
      .eq("id", item.id);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    await onChanged();
    toast.success("Item salvo!");
  }

  async function remove() {
    const { error } = await supabase.from("media_items").delete().eq("id", item.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    await onChanged();
    toast.success("Item removido.");
  }

  return (
    <section className="mb-6 rounded-2xl border border-outline-variant/40 bg-surface p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h3 className="font-display text-sm font-bold text-primary">
          {draft.label || draft.alt || "Item"}
        </h3>
        <div className="flex gap-1">
          <Button disabled={!canMoveUp || busy} onClick={onMoveUp} size="sm" variant="ghost">
            ↑
          </Button>
          <Button disabled={!canMoveDown || busy} onClick={onMoveDown} size="sm" variant="ghost">
            ↓
          </Button>
          <Button onClick={remove} size="sm" variant="ghost">
            Excluir
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <MediaField
          accept="image/*"
          label="Capa (miniatura)"
          onChange={(value) => setDraft({ ...draft, thumb_url: value })}
          value={draft.thumb_url}
        />
        <MediaField
          accept="video/*"
          label="Vídeo (opcional)"
          onChange={(value) => setDraft({ ...draft, video_url: value })}
          value={draft.video_url ?? ""}
        />
        <Field
          label="Legenda sobre a imagem (ex.: GO-173)"
          onChange={(value) => setDraft({ ...draft, label: value })}
          value={draft.label ?? ""}
        />
        <Field
          label="Descrição da imagem (acessibilidade)"
          onChange={(value) => setDraft({ ...draft, alt: value })}
          value={draft.alt}
        />
        <div className="flex justify-end">
          <Button disabled={saving} onClick={save}>
            {saving ? "Salvando…" : "Salvar item"}
          </Button>
        </div>
      </div>
    </section>
  );
}