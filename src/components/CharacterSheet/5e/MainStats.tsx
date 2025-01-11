import BoxStat from "../../BoxStat";
import HitDice from "./HitDice";
import Button from "../../Library/Button";
import { setCharacterInspiration } from "../../../scripts/controllers/5e/charactersController";

interface Props {
  character: Character_5e
  setCharacter: (char: Character_5e) => void
  editing: boolean
}


export default function MainStats({ character, setCharacter, editing }: Props) {
  const init = character.abilityScores.find((score) => score.name === 'dex').mod;

  const toggleInspiration = async () => {
    await setCharacterInspiration(character.id, !character.insp);
    setCharacter({ ...character, insp: !character.insp });
  };


  return (
    <div className="main-stats">
      {!editing ?
        <>
          <div className="main-stats__row">
            <div className="main-stats__ac">
              <img src="/images/icons/shield.svg" alt="" />
              <p>{ character.ac }</p>
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
        </>
        :
        <>
          <div className="main-stats__row">
            <div className="main-stats__ac">
              <img src="/images/icons/shield.svg" alt="" />
              <Button variants={['hover-scale', 'bold']}>Edit</Button>
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
        </>
      }
    </div>
  );
}
