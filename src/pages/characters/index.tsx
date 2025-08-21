import CharactersList from "@/rulesets/5e/components/Characters/CharactersList";
import UserBox from "@/components/UserBox";


export default function Characters() {
  return (
    <div className="characters-page">
      <UserBox />
      <CharactersList />
    </div>
  );
}
