import CharactersList from "@/rulesets/dnd/components/characters/CharactersList";
import UserBox from "@/components/UserBox";
import Layout from "@/components/Layout";


export default function Characters() {
  return (
    <Layout>
      <div className="characters-page">
        <UserBox />
        <CharactersList />
      </div>
    </Layout>
  );
}
