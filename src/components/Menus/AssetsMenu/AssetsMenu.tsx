import { useEffect, useState } from "react";
import { getAssets } from "../../../scripts/controllers/assetsController";
import { toggleMenu } from "../../../scripts/menuManager";
import MenuTokenIcon from "./MenuTokenIcon";


export default function AssetsMenu() {
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setAssets(await getAssets());
    };
    fetchData();
  }, []);

  return (
    <div className="menu hidden" id="assets-menu">
      <button className="menu__btn menu__btn--close" onClick={() => toggleMenu('assets')}>X</button>
      <div className="menu__body">
        {assets.map((asset) => {
          return (
            <div className="menu__body--container" key={asset.id}>
              <MenuTokenIcon asset={asset} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
