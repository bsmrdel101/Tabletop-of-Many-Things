import GamesList from "@/components/games/GamesList";
import JoinGame from "@/components/games/JoinGame";
import Layout from "@/components/Layout";


export default function PlayPage() {
  return (
    <Layout>
      <div className="play">
        <JoinGame />
        <GamesList />
      </div>
    </Layout>
  );
}
