import ListDisplay from "../../ListDisplay";

interface Props {
  character: Character_5e
}


export default function Resistances({ character }: Props) {
  return (
    <ListDisplay title="Resistances" data={character.resistances} />
  );
}
