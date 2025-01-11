import BoxStat from "../../BoxStat";
import HitDice from "./HitDice";
import Button from "../../Library/Button";
import { setCharacterInspiration } from "../../../scripts/controllers/5e/charactersController";
import { emitServerEvent } from "../../../scripts/config/socket-io";
import { useState } from "react";
import EditArmorDialog from "../../Dialogs/5e/CharacterSheet/EditArmorDialog";

interface Props {
  character: Character_5e
  editing: boolean
  room: string
}


export default function MainStats({ character, editing, room }: Props) {
  const [editAcOpen, setEditAcOpen] = useState(false);
  const init = character.abilityScores.find((score) => score.name === 'dex').mod;

  const toggleInspiration = async () => {
    await setCharacterInspiration(character.id, !character.insp);
    emitServerEvent('UPDATE_PLAYER', [{ ...character, insp: !character.insp }, room]);
  };


  return (
    <div className="main-stats">
      <EditArmorDialog open={editAcOpen} setOpen={setEditAcOpen} character={character} />

      <div className="main-stats__row">
        <div className="main-stats__ac">
          <img src="/images/icons/shield.svg" alt="" />
          {!editing ?
            <p>{ character.ac }</p>
            :
            <Button
              variants={['hover-scale', 'bold']}
              onClick={() => setEditAcOpen(true)}
            >
              Edit
            </Button>
          }
        </div>

        <div className="main-stats__column">
          <BoxStat title="Inspired" onClick={toggleInspiration}>
            <img
              src={`/images/icons/${character.insp ? 'star' : 'star-empty'}.svg`}
              alt={character.insp ? 'inpsired' : 'not inpsired'}
              width={23}
            />
          </BoxStat>
          <BoxStat title="Initiative">
            <p>{ init >= 0 ? '+' : '' }{ init }</p>
          </BoxStat>
        </div>
      </div>

      <HitDice character={character} />
    </div>
  );
}
