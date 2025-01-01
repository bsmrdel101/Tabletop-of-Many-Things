import { capitalize } from "../../../scripts/tools/stringUtils";
import ListDisplay from "../../ListDisplay";

interface Props {
  character: Character_5e
}


export default function Senses({ character }: Props) {
  const senses = character.senses.map((speed) => {
    return `${capitalize(speed.name)} ${speed.value}${typeof speed.value === 'number' ? ' ft' : ''}`;
  });


  return (
    <ListDisplay title="Senses" data={senses} />
  );
}
