import { supabase } from "@/integrations/supabase/client";

import { STORAGE_PREFIX } from "./site-content";

/** Uploads a file to the media bucket and returns its stored reference. */
export async function uploadMedia(file: File): Promise<string> {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const path = `${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "3600",
    contentType: file.type || undefined,
  });

  if (error) throw error;
  return `${STORAGE_PREFIX}${path}`;
}