import { capitalize } from "../../../scripts/tools/stringUtils";
import ListDisplay from "../../ListDisplay";

interface Props {
  character: Character_5e
}


export default function Speeds({ character }: Props) {
  const speeds = character.speeds.map((speed) => {
    return `${capitalize(speed.name)} ${speed.value} ft${speed.hover ? ' (hover)' : ''}`;
  });


  return (
    <ListDisplay title="Speeds" data={speeds} />
  );
}
