import BoxStat from "../../BoxStat";
import HitDice from "./HitDice";
import Button from "../../Library/Button";
import { setCharacterInspiration } from "../../../scripts/controllers/5e/charactersController";
import { emitServerEvent } from "../../../scripts/config/socket-io";

interface Props {
  character: Character_5e
  editing: boolean
}


export default function MainStats({ character, editing }: Props) {
  const init = character.abilityScores.find((score) => score.name === 'dex').mod;

  const toggleInspiration = async () => {
    await setCharacterInspiration(character.id, !character.insp);
    emitServerEvent('UPDATE_PLAYER', [{ ...character, insp: !character.insp }]);
  };


  return (
    <div className="main-stats">
      <div className="main-stats__row">
        <div className="main-stats__ac">
          <img src="/images/icons/shield.svg" alt="" />
          {!editing ?
            <p>{ character.ac }</p>
            :
            <Button variants={['hover-scale', 'bold']}>Edit</Button>
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
