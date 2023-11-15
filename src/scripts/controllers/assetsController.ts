import axios from "axios";
import { Asset } from "../types";


// === GET routes === //

export const getAssets = async () => {
  try {
    const res: any = await axios.get('/api/asset');
    const newTokenRes = res.data.map((asset: Asset) => {
      return { id: asset.id, image: asset.image };
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
