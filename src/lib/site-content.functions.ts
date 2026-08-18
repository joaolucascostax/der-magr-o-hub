import { createServerFn } from "@tanstack/react-start";

import { buildSiteData, defaultSiteData, type MediaItem, type SiteData } from "./site-content";
import { createPublicSupabaseClient } from "./supabase-public.server";

export const getSiteData = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteData> => {
    try {
      const supabase = createPublicSupabaseClient();
      const [content, media] = await Promise.all([
        supabase.from("site_content").select("key, value"),
        supabase
          .from("media_items")
          .select("id, section, label, alt, thumb_url, video_url, sort_order")
          .order("sort_order", { ascending: true }),
      ]);

      return buildSiteData(content.data ?? [], (media.data ?? []) as MediaItem[]);
    } catch (error) {
      console.error("[getSiteData]", error);
      return defaultSiteData;
    }
  },
);