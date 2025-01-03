import ListDisplay from "../../ListDisplay";

interface Props {
  character: Character_5e
}


export default function DmgImmunities({ character }: Props) {
  return (
    <ListDisplay title="Damage Immunities" data={character.dmgImmunities} />
  );
}
