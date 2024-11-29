import axios from "axios";


// === GET routes === //

export const getAssets = async () => {
  try {
    const res: any = await axios.get('/api/asset');
    const newTokenRes = res.data.map((asset: Asset) => {
      return { id: asset.id, image: asset.img };
    });
    return newTokenRes;
  } catch (err) {
    console.log(err);
  }
};

// === POST routes === //

export const addAsset = async (payload: Asset) => {
  try {
    await axios.post('/api/asset', payload);
  } catch (err) {
    console.log(err);
  }
};
