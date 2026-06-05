import GamesList from "@/components/home/GamesList";
import Layout from "@/components/Layout";


export default function PlayPage() {
  return (
    <Layout>
      <div className="play">
        <GamesList />
      </div>
    </Layout>
  );
}
