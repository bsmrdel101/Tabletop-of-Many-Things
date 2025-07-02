import CharacterSheet5e from "@/containers/Characters/5e/CharacterSheet5e";


export default function CharacterPage() {
  const queryParams = new URLSearchParams(location.search);
  const ruleset = queryParams.get('ruleset');


  return (
    <>
      { ruleset === '5e' && <CharacterSheet5e /> }
    </>
  );
}
