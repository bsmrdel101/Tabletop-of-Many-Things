import { memo } from "react";

interface Props {
  bardicInsp: BardicInsp_Dnd
}


function Inspiration({ bardicInsp }: Props) {
  return (
    <p className="character-sheet-main-header__inspiration">
      <strong>Inspiration:</strong> <span>d{ bardicInsp.type }</span>
    </p>
  );
}

export default memo(Inspiration);
