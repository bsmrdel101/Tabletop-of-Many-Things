import CharactersList from "@/rulesets/dnd/components/characters/CharactersList";
import Layout from "@/components/Layout";


export default function Characters() {
  return (
    <Layout>
      <div className="characters-page">
        <CharactersList />
      </div>
    </Layout>
  );
}
