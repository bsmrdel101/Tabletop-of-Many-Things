import BoxStat from "@/components/BoxStat";
import { profFromLvl } from "@/rulesets/dnd/scripts/gameSystemsInfo";
import { numPrefix } from "@/scripts/tools/utils";
import { useMemo, useState } from "react";
import EditArmorDialog from "./dialogs/EditArmorDialog";

interface Props {
  character: Character_5e
}


export default function MainStats({ character }: Props) {
  const [editAcOpen, setEditAcOpen] = useState(false);

  const init = useMemo(() => {
    return character.abilityScores.find((score) => score.name === 'dex')?.mod ?? 0;
  }, [character]);


  return (
    <div className="main-stats">
      <EditArmorDialog open={editAcOpen} setOpen={setEditAcOpen} character={character} />

      <div className="main-stats__row">
        <div className="main-stats__ac" onClick={() => setEditAcOpen(true)}>
          <img src="/images/game/shield.svg" alt="" draggable={false} />
          <p>{ character.ac }</p>
        </div>

        <div className="main-stats__column">
          <BoxStat title="Proficiency">
            <p>+{ profFromLvl(character.lvl) }</p>
          </BoxStat>
          <BoxStat title="Initiative">
            <p>{ numPrefix(init) }</p>
          </BoxStat>
        </div>
      </div>
    </div>
  );
}
