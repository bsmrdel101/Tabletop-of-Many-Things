import CharactersList from "@/rulesets/dnd/components/characters/CharactersList";
import UserBox from "@/components/UserBox";


export default function Characters() {
  return (
    <div className="characters-page">
      <UserBox />
      <CharactersList />
    </div>
  );
}
