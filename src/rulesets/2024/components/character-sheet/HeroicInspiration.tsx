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
        <img src="/images/game/star.svg" alt="Star" />
        :
        <img src="/images/game/star-empty.svg" alt="Star" />
      }
    </div>
  );
}

export default memo(Inspiration);
