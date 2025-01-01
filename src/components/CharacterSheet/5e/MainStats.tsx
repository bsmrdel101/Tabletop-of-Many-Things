import BoxStats from "../../BoxStat";
import HitDice from "./HitDice";

interface Props {
  character: Character_5e
  editing: boolean
}


export default function MainStats({ character, editing }: Props) {
  return (
    <div className="main-stats">
      <div className="main-stats__row">
        <div className="main-stats__ac">
          <img src="/images/icons/shield.svg" alt="" />
          <p>{ character.ac }</p>
        </div>

        <div className="main-stats__column">
          <BoxStats title="Inspired">
            <img
              src={`/images/icons/${character.insp ? 'star' : 'star-empty'}.svg`}
              alt={character.insp ? 'inpsired' : 'not inpsired'}
              width={23}
            />
          </BoxStats>
          <BoxStats title="Initiative">
            <p>+0</p>
          </BoxStats>
        </div>
      </div>

      <HitDice character={character} />
    </div>
  );
}
