import CharactersList from "@/containers/Characters/CharactersList";
import UserBox from "@/components/Home/UserBox";


export default function Characters() {
  return (
    <div className="characters-page">
      <h2>Characters</h2>
      <UserBox />
      <CharactersList />
    </div>
  );
}
