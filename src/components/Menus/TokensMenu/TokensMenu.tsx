import { useEffect, useState } from "react";
import { getTokens } from "../../../scripts/controllers/tokensController";
import { toggleMenu } from "../../../scripts/menuManager";
import MenuTokenIcon from "./MenuTokenIcon";
import { Token } from "../../../scripts/types";


export default function TokensMenu() {
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setTokens(await getTokens());
    };
    fetchData();
  }, []);

  return (
    <div className="menu hidden" id="tokens-menu">
      <button className="menu__btn menu__btn--close" onClick={() => toggleMenu('tokens')}>X</button>
      <div className="menu__body">
        {tokens.map((token) => {
          return (
            <div className="menu__body--container" key={token.id}>
              <MenuTokenIcon token={token} />
              {token.creature &&
                <button className="menu__item--circle-btn">
                  <img src="/images/rightArrowUp.svg" />
                </button>
              }
            </div>
          );
        })}
      </div>
    </div>
  );
}
