import ListDisplay from "../../ListDisplay";

interface Props {
  character: Character_5e
}


export default function CondImmunities({ character }: Props) {
  return (
    <ListDisplay title="Condition Immunities" data={character.condImmunities} />
  );
}
