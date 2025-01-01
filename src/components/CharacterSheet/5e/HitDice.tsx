import BoxStat from "../../BoxStat";
import DiceIcon from "../../DiceIcon";

interface Props {
  character: Character_5e
}


export default function HitDice({ character }: Props) {  
  return (
    <BoxStat title="Hit Dice">
      {character.currentHitDice.map((dice, i) => {
        return <DiceIcon key={i} type={`d${dice.type}`} text={`${dice.amount}`} />;
      })}
    </BoxStat>
  );
}
