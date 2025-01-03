import ListDisplay from "../../ListDisplay";

interface Props {
  character: Character_5e
}


export default function Vulnerabilities({ character }: Props) {
  return (
    <ListDisplay title="Vulnerabilities" data={character.vulnerabilities} />
  );
}
