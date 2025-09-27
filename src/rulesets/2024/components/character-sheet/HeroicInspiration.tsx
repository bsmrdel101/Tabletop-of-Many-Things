import Img from "@/components/library/Img";
import { memo } from "react";

interface Props {
  insp: boolean
}


function Inspiration({ insp }: Props) {
  return (
    <div
      className="character-sheet-main-header__inspiration"
      // onClick={() => toggleInspiration(!insp)}
    >
      <p>Heroic Inspiration</p>
      {insp ?
        <Img src="/images/game/star.svg" alt="Star" />
        :
        <Img src="/images/game/star-empty.svg" alt="Star" />
      }
    </div>
  );
}

export default memo(Inspiration);
