import { supabase } from "@/scripts/config/supabase";


// === GET routes === //

export const getFile = async (bucket: string, path: string): Promise<string | null> => {
  try {
    const publicUrl = supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
    return publicUrl;
  } catch(error) {
    console.log(error);
    return null;
  }
};

// === POST routes === //

export const uploadFile = async (bucket: string, file: File | null, name: string, options?: { contentType?: string, upsert?: boolean }): Promise<string | null> => {
  try {
    if (!file) {
      console.error('No file data');
      return null;
    }
    const { error, data } = await supabase.storage.from(bucket).upload(name, file, options ?? {});
    if (error) console.error(error);
    if (!data) return null;
    return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;
  } catch(error) {
    console.log(error);
    return null;
  }
};

// === DELETE routes === //

export const deleteFile = async (bucket: string, path: string) => {
  try {
    await supabase.storage.from(bucket).remove(path.split('/'));
  } catch(error) {
    console.log(error);
  }
};
