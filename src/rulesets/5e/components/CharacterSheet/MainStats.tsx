import BoxStat from "@/components/BoxStat";
import { roomAtom } from "@/scripts/atoms/state";
import { profFromLvl } from "@/rulesets/dnd/scripts/gameSystemsInfo";
import { numPrefix } from "@/scripts/tools/utils";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";

interface Props {
  character: Character_5e
}


export default function MainStats({ character }: Props) {
  /* eslint-disable */
  const [room] = useAtom(roomAtom);
  const [editAcOpen, setEditAcOpen] = useState(false);
  /* eslint-enable */

  const init = useMemo(() => {
    return character.abilityScores.find((score) => score.name === 'dex')?.mod ?? 0;
  }, [character]);


  return (
    <div className="main-stats">
      {/* <EditArmorDialog open={editAcOpen} setOpen={setEditAcOpen} character={character} room={room} /> */}

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
