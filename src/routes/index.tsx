import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import heroKombi from "@/assets/eder-magrao-kombi.jpg.asset.json";
import go173Capa from "@/assets/go173-capa.jpg.asset.json";
import go173Video from "@/assets/go173.mp4.asset.json";

export const Route = createFileRoute("/")({
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
  return (
    <div className="min-h-screen bg-background pb-28 pt-16 text-on-background antialiased">
      <TopAppBar />
      <main className="flex flex-col gap-16">
        <HeroSection />
        <TrabalhosSection />
        <ProjetosSection />
        <LutasSection />
      </main>
      <Footer />
      <BottomNavBar />
    </div>
  );
}

function TopAppBar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-outline-variant/50 bg-surface/90 shadow-sm backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-16 w-full max-w-container-max items-center justify-between px-margin-mobile md:px-margin-desktop">
        <div className="group flex items-center gap-3">
          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-primary/10 bg-surface-variant shadow-sm">
            <img
              alt="Foto do Vereador Éder Magrão"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJWT9CsfCY5J5BcPkCqaYLWoAX6R1nbt74Ax5aHITFh8sqduJYRKdMuKkCi57AS2eBlOqvKcBG8u6yq5OFWwTjNfLUQJGoWUpqrgQckpl6ZhTsu8_mAew7Ki9u3SLCegvGx_lgqb9huiEb2B1_ZbO59t3zgpo9Qpjn0v-tNtn52nNCw_855RdG0WBWbFEKOkuQcW3ljzBeStOyBsLxeBnPKMIzNkYQdNGTqKfoqjbg8wpJUTdU9rqV"
            />
          </div>
          <h1 className="font-display text-xl font-bold tracking-tight text-primary">
            Vereador Éder Magrão
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

function HeroSection() {
  return (
    <section className="relative isolate -mt-16 flex h-[65vh] w-full flex-col justify-end overflow-hidden rounded-b-3xl text-left shadow-lg">
      <div className="absolute inset-0 -z-10">
        <img
          alt="Vereador Éder Magrão em atividade de campanha com a comunidade"
          className="h-full w-full object-cover"
          src={heroKombi.url}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>
      <div className="relative z-10 flex flex-col gap-4 px-margin-mobile pb-16 pt-32 md:px-margin-desktop">
        <div className="w-max rounded-full bg-secondary px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-on-secondary shadow-md backdrop-blur-sm">
          DEPUTADO ESTADUAL
        </div>
        <h2 className="font-display text-[44px] font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-md">
          <span className="block font-light opacity-90">Trabalho</span>
          <span className="block">e Compromisso</span>
        </h2>
        <p className="max-w-sm font-body text-lg font-medium text-primary-fixed-dim drop-shadow-sm">
          Acompanhe nosso trabalho em prol de uma cidade melhor para todos.
        </p>
      </div>
    </section>
  );
}

const projetosGaleria = [
  {
    alt: "Novo centro comunitário com arquitetura moderna",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkPYwP-F7svCsmfwOG5Dxcr0z7YGD5uasw2rqgir5XRdAyrLkxvYJuZSEzAiaPPCI5A-F7WfurxNg4IDxPmgLynoIMD1ZbsC1NBqogI9ESaNI0w82yoozLM0Vw82y4eJYJfr9lzXAw3TFqnUS6zqdEO16LoFLuhp5ZNHZ6UUGnIngSOXqJqlx_r6YP5MPk8wyXKBmCYAhU2da6BhgKESI31WbwA7mVKCsDtETu92DqwgE2SjMZNa3F",
  },
  {
    alt: "Rua recém-pavimentada com faixas de pedestres e arborização",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJbGlnS_iithHtU4upzYFR7qTCYB5xVu1b1w4daFc7Hdp6p-5NaHmfLIL1Nuyw5DSMVSaBDlJBzICgeM_hYnfHAXaavIQBhY5cJRuq3xewBLjmL3MEoWJTueLcTpmdXmnqzElDFDstiRiQkcrDZ2gwNbouANkZfjUlteFWsDJhpE0Krrq37oGlmPrE9SP8A4R2i2lM5iLKc08wRKiEZtRnSizf0r9QiiAOJfTbVPNj02vWsHai-WQt",
  },
  {
    alt: "Parque infantil moderno com crianças brincando",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3S_jAIFvE6BeJCZEYxRNFpNr0VMgYOHEFc2Psj0xrQ1ESpjjLDUszv-_fS1CR0U81vytLX3bnlqzmY5yArLwP9lkVnHwuhZLISAbF71jRlDn5dVat-_xmZC6qr5ud3bTXdyu33rOGX4XJOB_9IidgkBxU7IP4zO76Zj0-amDQ79WfGXOiFxMKlNCYr2tybsa34er_0FIZp6FTM9FnwtrBI_8HnwnFLe0ZApgN93-47t9JeXWf3Izb",
  },
];

const projetosVideos = [
  {
    alt: "Vereador discursando em evento público",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKh-fUjw__-g6Hc4P_FTZnc6jv9ru-VotFlQDl4Vd3GMGj1eEo1869K7_Wd7GHosWmhJ1w68V15GpLp0LpTHRwIuaLRdg_JISIJU_Ny--T3fabZ_ppCl6PrpEl5F2Ay1DsCnTper4onHdPNhBQjujXh03PQUWTDO1FtQjlRVc6RTE9_BCQr3Qba0v_SGd-tFDbZzDV8qzbMY3XGG-FPF84OWrR2lksl_rmyCOPlq6zw-6Sw3ooBO6D",
  },
  {
    alt: "Mãos segurando plantas arquitetônicas",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUKyefh176ZUExn1Di9mhArJgZX6E6L7cI0xejTYb1hCqWS2eqPDMdFNv3khPehJEz_4DiqlZOYIazZyoNhqXfP3v0YhaNxCCe7uGAjIpgAMWK2d0VxXWXQ_4GLlJh7zohgZwK6dxTMsd5lKp1e9WI5MC4RCwf-U5Cm9SrYqzPLwKQMqkZ96SeyLhSashIhNPIjwwmUun2-SikQ_yP5_r1PYqkJI6YA314bBw-zvmulnItDls_TwGu",
  },
  {
    alt: "Interior moderno da prefeitura",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWpZpq70cHwNNvngkRdCfrfPmE2noUVd2eu5uMHXq122rxKKCuyjCrFhJQvYcDo8MDyhkN-DpxeXMV6ZwqR0dP-UWPH8WXL4brc8oSdnKMo1mGFzuQ9EfmOrGpOtcwczY0BitduHQa7klSrARrdX0GB0ms172V5Irh3UGWjh0sDj2NV0MKxvx9SghmQ6wIMbPpCPh1OFtNiQavI1ITBYeYktqUECrgxd1DLWdi4e7zk6d2vlYG2XIi",
  },
];

function ProjetosSection() {
  return (
    <section className="relative flex flex-col gap-8 px-margin-mobile md:px-margin-desktop" id="projetos">
      <div className="absolute -right-10 -top-10 -z-10 h-32 w-32 rounded-full bg-primary-fixed/30 blur-3xl" />
      <div className="flex items-center gap-3">
        <div className="h-8 w-1.5 rounded-full bg-gradient-to-b from-primary to-secondary" />
        <h3 className="font-display text-headline-lg-mobile font-extrabold tracking-tight text-primary md:text-headline-lg">
          Projetos
        </h3>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h4 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-primary">
            <span className="material-symbols-outlined text-lg">photo_library</span>
            Galeria
          </h4>
          <div className="flex gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
          </div>
        </div>
        <div className="hide-scrollbar -mx-margin-mobile flex snap-x snap-mandatory gap-5 overflow-x-auto px-margin-mobile pb-6 pt-2 md:mx-0 md:px-0">
          {projetosGaleria.map((item, index) => (
            <div
              key={index}
              className="group relative h-52 w-64 flex-shrink-0 snap-center overflow-hidden rounded-2xl border border-outline-variant/30 shadow-md transition-shadow duration-300 hover:shadow-xl"
            >
              <img
                alt={item.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={item.src}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h4 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-primary">
            <span className="material-symbols-outlined text-lg">play_circle</span>
            Vídeos Recentes
          </h4>
          <span className="material-symbols-outlined text-sm text-outline">arrow_forward</span>
        </div>
        <div className="hide-scrollbar -mx-margin-mobile flex snap-x snap-mandatory gap-4 overflow-x-auto px-margin-mobile pb-6 pt-2 md:mx-0 md:px-0">
          {projetosVideos.map((item, index) => (
            <div
              key={index}
              className="group relative h-56 w-44 flex-shrink-0 snap-center overflow-hidden rounded-2xl bg-surface-variant shadow-md"
            >
              <img
                alt={item.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={item.src}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const trabalhosCards = [
  {
    alt: "Voluntários em ação de limpeza de riacho",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfCcfZ8RRWMHLzDw1vj3zlqB3uw9Vk1qKxr7Hk4pNU08ZcC7la_e0kNWC_NnWMDEI_RDP9iZ7OjrAXR2Aj93ADQIrMRq0jQmhWpMqCutSst3Zq-wnwvnKshPL2ZXl28ArHVoeljVIojU7dvzJKSfmfSdqQOrAGkO1forg_ZHjdxMq0jOoUhPXXLJOe-OUccu75lXDUGJ53t7WRPYQXmAfDsNggmSEEC6G2_hkVm2IZG4Hq62itG7yX",
    status: "Concluído",
    title: "Revitalização da Praça Central",
  },
  {
    alt: "Novo ponto de ônibus moderno com passageiros",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8xALoglGkR73G_5Wv0l_zIFuh0U7OVGDnS14ZztMz_zbKMJFKXJxsjRaJloRLBpwkH0WXczzv20pxkARs1JNcvRhibG--qTx098PY4HyvNJnTUjz1mBtjqJeTzHHTnUyyuKfYoTQN5o9HeZNZuKhrVNL63qkZJWGhxCTM2D7z9eK1AN98325vYF-q6BISR5J_O-K3P2npWSG5GonMU29HKm7mwQWRloi1dlFP4ghEM2XwhFoR1D2H",
    status: "Concluído",
    title: "Novos Pontos de Ônibus",
  },
];

const trabalhosVideos = [
  {
    alt: "Carreta tombada na rodovia GO-173",
    label: "GO-173",
    src: go173Capa.url,
    video: go173Video.url,
  },
  {
    alt: "Time-lapse de pavimentação de rua",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDG3IRHgXeKM_751dsqmXAKDiKHObu2nXFK-TLRKkkDxrs7Ic5d7pO9UwlXoly4uEkc56DD72Ey3Wka50QsyLvQmdFOe3f5lu9MZnyUq8eUBPOLL_wT_4ctdX0JnM23dTdAzgICZUCug7hPWrANtlZqRrB3__IbzoJTUYNhy3snDwUSMtao0mpTQjlaM_Ysq2Mwz5F2Qla7pkKIGTbsEQxI0kx0eYG1Etz8bMU6xcNkxITKVKrW0uR1",
  },
  {
    alt: "Cerimônia de inauguração com corte de fita",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmJG6ZkEJebG5JVTndLdyru3SLwYdVyJa5F9Vn3tw8VXajYYQ6TkLUEY_RE-r2mDdjg61TSB_kPAZkZbpJvR__LsSqWl5PziST97r4nctAWVqHa84D7PtQ9yj7ozmtcIMzMrLpwekf-ALYmLBR7P75WcPudaB4PL3nYuohp9f-jijEvd9VFv1D70ODz2_2NjgHbMO69SM0it8P_DNmcxBur6ofLovOkdF7ORxxHIkjc_Tas5Wm75As",
  },
];

function TrabalhosSection() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  return (
    <div className="relative w-full bg-gradient-to-b from-surface-container-low to-surface py-16">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(var(--color-primary) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <section className="relative z-10 flex flex-col gap-8 px-margin-mobile md:px-margin-desktop" id="trabalhos">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 rounded-full bg-gradient-to-b from-primary to-secondary" />
          <h3 className="font-display text-headline-lg-mobile font-extrabold tracking-tight text-primary md:text-headline-lg">
            Trabalhos Realizados
          </h3>
        </div>

        <div className="flex flex-col gap-5">
          <h4 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-primary">
            <span className="material-symbols-outlined text-lg">track_changes</span>
            ACOMPANHE NOSSAS LUTAS
          </h4>
          <div className="hide-scrollbar -mx-margin-mobile flex snap-x snap-mandatory gap-4 overflow-x-auto px-margin-mobile pb-6 pt-2 md:mx-0 md:px-0">
            {trabalhosVideos.map((item, index) => (
              <div
                key={index}
                className="group relative h-56 w-44 flex-shrink-0 cursor-pointer snap-center overflow-hidden rounded-2xl bg-surface-variant shadow-md"
                onClick={() => "video" in item && setPlayingIndex(index)}
              >
                {"video" in item && playingIndex === index ? (
                  <video
                    autoPlay
                    className="h-full w-full object-cover"
                    controls
                    playsInline
                    poster={item.src}
                    src={item.video}
                  />
                ) : (
                  <>
                    <img
                      alt={item.alt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src={item.src}
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
                    {"label" in item ? (
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

        <div className="flex flex-col gap-5">
          <div className="hide-scrollbar -mx-margin-mobile flex snap-x snap-mandatory gap-5 overflow-x-auto px-margin-mobile pb-6 pt-2 md:mx-0 md:px-0">
            {trabalhosCards.map((item, index) => (
              <div
                key={index}
                className="group flex w-72 flex-shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-outline-variant/20 bg-white shadow-lg shadow-surface-variant/50"
              >
                <div className="relative h-44 w-full overflow-hidden bg-surface-variant">
                  <img
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={item.src}
                  />
                  <div className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 shadow-sm backdrop-blur-sm text-secondary">
                    <span
                      className="material-symbols-outlined text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  </div>
                </div>
                <div className="relative flex flex-col gap-3 p-5">
                  <span className="relative -mt-8 z-10 w-max rounded-md border border-secondary/20 bg-secondary/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-secondary shadow-sm backdrop-blur-md">
                    {item.status}
                  </span>
                  <h4 className="mt-1 font-display text-lg font-bold leading-tight text-on-surface">
                    {item.title}
                  </h4>
                  <div className="group/link mt-1 flex cursor-pointer items-center gap-1 text-sm font-medium text-primary transition-transform duration-300 group-hover:translate-x-1">
                    <span>Ver detalhes</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const lutasCards = [
  {
    alt: "Reunião comunitária em ginásio",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFLDyd1bm9WlpJdoaXuGfmMQkhzWsko-zvpJpMpYq29Estz1_83mysngegMOtJr7sCBX2lO1JZ1-lLIUKe6PaMpqY36pTwJ7SCCstU38iVcSWuORih_4to5HF5BTEXG8t1I-K1XFea_HbA27bS6Uj6hN6ykFivHGn9bldiRDYDL5h_h8HTYTPG6DlTw6uZZOFYMvWAD3OGCxTlyWGjpe7ebI88Ey50bQ0jSoRAkF1yKwv0pfv3lya3",
    title: "Saúde Pública",
  },
  {
    alt: "Sala de aula moderna e iluminada",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsMJAvmXwBC6lKKnrEr5T4nwqUN7LFVjYvQZnri0eYv4XwBKqKtZcjS8fMeOoTbeeKj3GwktqGEH4tMS_Xo16KEmNfClzhyUbgxKU0vv8wUR36GBsSFqXV0EqPdO-8gDncLP6_ylFS86GTsgvVoXX_gG07HZFnHdTU5j9YNeSvwEwgn0tOvTzA-drSFGF9xL-QSHhgwaSUd2YojBlLQ50XrO3per-WxfJmS0D-4RIHTTP59Zb7p-q3",
    title: "Educação",
  },
];

const lutasVideos = [
  {
    alt: "Vereador discursando na câmara legislativa",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAR0KdM6tj_zGBYSOtQNVroSm46SmpvzDyNaW3IEDjd8dtlnyNdPNWaFrcfWsF6pY5Kc0IYYcmVFiaUySnf_9uIL4hsiH9gv9SSizIjGbgU2yfQ3hFnr_63f3QDkjk8DFcH_ficXi47OsYIOAG0lkITx5Mf5Avt_8gTRCsax9AaRfE2NnKbtfuw05uG7DXKcVPMnj3vFjDOCs11BlMVIXqcsChXiECBh1Pv_lTA4JFI60HTzr_X4DkT",
  },
  {
    alt: "Mobilização comunitária organizada",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyr2EksPVi9taM49cX6lblgins6K8MNZQBIZAz84rkk0OaNYRaoq-wuzRxRRw-t4OTN7I8iqV_dczDimtzlWQeSFBBQBzfvhdc-34KISc5qWCQFlh1K8ttJRRPE6kDdbaUMsoD6PsJxzGQFgTUkS7SkUF-LatWFvI2LUXCPxAj_9mXPBE8lybUqyDmILz3vMsEFAUorbnqBlxib3i9yvUcpIVlUmlgVoU_cI7BV3DeA5z8UystiNBT",
  },
];

function LutasSection() {
  return (
    <section className="relative flex flex-col gap-8 px-margin-mobile md:px-margin-desktop" id="lutas">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1.5 rounded-full bg-gradient-to-b from-primary to-secondary" />
        <h3 className="font-display text-headline-lg-mobile font-extrabold tracking-tight text-primary md:text-headline-lg">
          Lutas
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {lutasCards.map((item, index) => (
          <div
            key={index}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border border-outline-variant/30 shadow-md transition-shadow duration-300 hover:shadow-xl"
          >
            <img
              alt={item.alt}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              src={item.src}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4 transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
              <div className="mb-1 h-1 w-8 rounded-full bg-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="font-display text-lg font-bold leading-tight text-white drop-shadow-md">
                {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-5">
        <h4 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-primary">
          <span className="material-symbols-outlined text-lg">record_voice_over</span>
          Nossa Voz
        </h4>
        <div className="hide-scrollbar -mx-margin-mobile flex snap-x snap-mandatory gap-4 overflow-x-auto px-margin-mobile pb-6 pt-2 md:mx-0 md:px-0">
          {lutasVideos.map((item, index) => (
            <div
              key={index}
              className="group relative h-56 w-44 flex-shrink-0 snap-center overflow-hidden rounded-2xl bg-surface-variant shadow-md"
            >
              <img
                alt={item.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={item.src}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const socialLinks = [
  { icon: "chat", label: "WhatsApp" },
  { icon: "photo_camera", label: "Instagram" },
  { icon: "smart_display", label: "YouTube" },
];

function Footer() {
  return (
    <footer className="mt-12 flex w-full flex-col items-center gap-6 border-t border-outline-variant/30 bg-surface-container-high px-margin-mobile py-12 pb-24 text-center md:px-margin-desktop">
      <div className="mb-2 h-1 w-12 rounded-full bg-gradient-to-r from-primary to-secondary" />
      <p className="font-display text-[22px] font-extrabold text-primary">Vereador Éder Magrão</p>
      <p className="max-w-sm font-body text-base font-medium text-on-surface-variant">
        Transparência e Trabalho. Acompanhe nossas redes sociais e participe do nosso mandato.
      </p>
      <div className="mt-6 flex gap-8">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            className="group flex flex-col items-center gap-2 text-on-surface-variant transition-all duration-300 hover:text-primary"
            href="#"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface shadow-sm transition-colors group-hover:bg-primary/10 group-hover:text-primary">
              <span className="material-symbols-outlined text-2xl">{link.icon}</span>
            </div>
            <span className="font-label text-xs font-medium tracking-wide">{link.label}</span>
          </a>
        ))}
      </div>
      <div className="my-4 h-px w-full max-w-[200px] bg-outline-variant/30" />
      <p className="font-body text-xs text-on-surface-variant/80">
        © 2024 Vereador Éder Magrão.
        <br />
        Transparência e Trabalho.
      </p>
    </footer>
  );
}

const navItems = [
  { href: "#", icon: "home", label: "Início", active: true },
  { href: "#projetos", icon: "account_balance", label: "Projetos" },
  { href: "#trabalhos", icon: "handyman", label: "Trabalhos" },
  { href: "#lutas", icon: "campaign", label: "Lutas" },
];

function BottomNavBar() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 flex h-20 w-full items-center justify-around border-t border-outline-variant/30 bg-surface/95 px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] backdrop-blur-md pb-safe">
      {navItems.map((item, index) => {
        const isActive = item.active;
        return (
          <a
            key={index}
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
