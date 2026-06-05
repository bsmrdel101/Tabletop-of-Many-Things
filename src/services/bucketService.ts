import api from "@/scripts/config/axios";
import { showError } from "@/components/library/Errors";


// === GET routes === //



// === POST routes === //

export const uploadToBucket = async (path: string, file: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append("path", path);

    const res = await api.post('/api/bucket/upload', formData);
    return res.data.url;
  } catch (error) {
    showError(error);
    return null;
  }
};
