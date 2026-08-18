CREATE TABLE public.site_content (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "site_content_public_read" ON public.site_content FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "site_content_admin_write" ON public.site_content FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.media_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL,
  label TEXT,
  alt TEXT NOT NULL DEFAULT '',
  thumb_url TEXT NOT NULL,
  video_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT media_items_section_check CHECK (section IN ('projetos', 'trabalhos', 'lutas'))
);

GRANT SELECT ON public.media_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.media_items TO authenticated;
GRANT ALL ON public.media_items TO service_role;

ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "media_items_public_read" ON public.media_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "media_items_admin_write" ON public.media_items FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE INDEX media_items_section_order_idx ON public.media_items (section, sort_order);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON public.site_content
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_media_items_updated_at BEFORE UPDATE ON public.media_items
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.site_content (key, value) VALUES
  ('header', '{"name": "Magrão da Rádio", "avatar_url": "/__l5e/assets-v1/734f7d34-a56a-4400-b7cf-699780cdf1c5/eder-magrao-fiscal.jpg"}'::jsonb),
  ('hero', '{"title_line1": "Trabalho", "title_line2": "e Compromisso", "subtitle": "Confira toda a jornada e trabalho do candidato à Deputado Estadual Magrão da Rádio.", "image_url": "/__l5e/assets-v1/1bdc7c13-d1e1-46b8-9cab-27ef99002566/eder-magrao-kombi.jpg", "image_alt": "Vereador Éder Magrão em atividade de campanha com a comunidade"}'::jsonb),
  ('section_trabalhos', '{"title": "Trabalhos Realizados", "subtitle": "ACOMPANHE NOSSAS LUTAS", "icon": "track_changes"}'::jsonb),
  ('section_projetos', '{"title": "Projetos", "subtitle": "VÍDEOS DOS PROJETOS", "icon": "play_circle"}'::jsonb),
  ('section_lutas', '{"title": "Lutas", "subtitle": "NOSSA VOZ", "icon": "record_voice_over"}'::jsonb),
  ('footer', '{"name": "Vereador Éder Magrão", "description": "Transparência e Trabalho. Acompanhe nossas redes sociais e participe do nosso mandato.", "copyright": "© 2026 Vereador Éder Magrão. Transparência e Trabalho.", "whatsapp_url": "#", "instagram_url": "#", "youtube_url": "#"}'::jsonb);

INSERT INTO public.media_items (section, label, alt, thumb_url, video_url, sort_order) VALUES
  ('trabalhos', 'GO-173', 'Carreta tombada na rodovia GO-173', '/__l5e/assets-v1/4b8c77b2-5a1f-4402-9eef-3c3be3303ad3/go173-capa.jpg', '/__l5e/assets-v1/b7bc3082-bdd5-4c6a-9fa2-572fd30da90d/go173.mp4', 0),
  ('trabalhos', NULL, 'Time-lapse de pavimentação de rua', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDG3IRHgXeKM_751dsqmXAKDiKHObu2nXFK-TLRKkkDxrs7Ic5d7pO9UwlXoly4uEkc56DD72Ey3Wka50QsyLvQmdFOe3f5lu9MZnyUq8eUBPOLL_wT_4ctdX0JnM23dTdAzgICZUCug7hPWrANtlZqRrB3__IbzoJTUYNhy3snDwUSMtao0mpTQjlaM_Ysq2Mwz5F2Qla7pkKIGTbsEQxI0kx0eYG1Etz8bMU6xcNkxITKVKrW0uR1', NULL, 1),
  ('trabalhos', NULL, 'Cerimônia de inauguração com corte de fita', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmJG6ZkEJebG5JVTndLdyru3SLwYdVyJa5F9Vn3tw8VXajYYQ6TkLUEY_RE-r2mDdjg61TSB_kPAZkZbpJvR__LsSqWl5PziST97r4nctAWVqHa84D7PtQ9yj7ozmtcIMzMrLpwekf-ALYmLBR7P75WcPudaB4PL3nYuohp9f-jijEvd9VFv1D70ODz2_2NjgHbMO69SM0it8P_DNmcxBur6ofLovOkdF7ORxxHIkjc_Tas5Wm75As', NULL, 2),
  ('projetos', NULL, 'Vereador discursando em evento público', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKh-fUjw__-g6Hc4P_FTZnc6jv9ru-VotFlQDl4Vd3GMGj1eEo1869K7_Wd7GHosWmhJ1w68V15GpLp0LpTHRwIuaLRdg_JISIJU_Ny--T3fabZ_ppCl6PrpEl5F2Ay1DsCnTper4onHdPNhBQjujXh03PQUWTDO1FtQjlRVc6RTE9_BCQr3Qba0v_SGd-tFDbZzDV8qzbMY3XGG-FPF84OWrR2lksl_rmyCOPlq6zw-6Sw3ooBO6D', NULL, 0),
  ('projetos', NULL, 'Mãos segurando plantas arquitetônicas', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUKyefh176ZUExn1Di9mhArJgZX6E6L7cI0xejTYb1hCqWS2eqPDMdFNv3khPehJEz_4DiqlZOYIazZyoNhqXfP3v0YhaNxCCe7uGAjIpgAMWK2d0VxXWXQ_4GLlJh7zohgZwK6dxTMsd5lKp1e9WI5MC4RCwf-U5Cm9SrYqzPLwKQMqkZ96SeyLhSashIhNPIjwwmUun2-SikQ_yP5_r1PYqkJI6YA314bBw-zvmulnItDls_TwGu', NULL, 1),
  ('projetos', NULL, 'Interior moderno da prefeitura', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWpZpq70cHwNNvngkRdCfrfPmE2noUVd2eu5uMHXq122rxKKCuyjCrFhJQvYcDo8MDyhkN-DpxeXMV6ZwqR0dP-UWPH8WXL4brc8oSdnKMo1mGFzuQ9EfmOrGpOtcwczY0BitduHQa7klSrARrdX0GB0ms172V5Irh3UGWjh0sDj2NV0MKxvx9SghmQ6wIMbPpCPh1OFtNiQavI1ITBYeYktqUECrgxd1DLWdi4e7zk6d2vlYG2XIi', NULL, 2),
  ('lutas', NULL, 'Vereador discursando na câmara legislativa', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR0KdM6tj_zGBYSOtQNVroSm46SmpvzDyNaW3IEDjd8dtlnyNdPNWaFrcfWsF6pY5Kc0IYYcmVFiaUySnf_9uIL4hsiH9gv9SSizIjGbgU2yfQ3hFnr_63f3QDkjk8DFcH_ficXi47OsYIOAG0lkITx5Mf5Avt_8gTRCsax9AaRfE2NnKbtfuw05uG7DXKcVPMnj3vFjDOCs11BlMVIXqcsChXiECBh1Pv_lTA4JFI60HTzr_X4DkT', NULL, 0),
  ('lutas', NULL, 'Mobilização comunitária organizada', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyr2EksPVi9taM49cX6lblgins6K8MNZQBIZAz84rkk0OaNYRaoq-wuzRxRRw-t4OTN7I8iqV_dczDimtzlWQeSFBBQBzfvhdc-34KISc5qWCQFlh1K8ttJRRPE6kDdbaUMsoD6PsJxzGQFgTUkS7SkUF-LatWFvI2LUXCPxAj_9mXPBE8lybUqyDmILz3vMsEFAUorbnqBlxib3i9yvUcpIVlUmlgVoU_cI7BV3DeA5z8UystiNBT', NULL, 1);