// === GET routes === //

export const getFileFromPath = async (path: string, fileName: string): Promise<File | null> => {
  try {
    const res = await fetch(path)
    const blob = await res.blob();
    return new File([blob], fileName, { type: blob.type });
  } catch(error) {
    console.log(error);
    return null;
  }
};
