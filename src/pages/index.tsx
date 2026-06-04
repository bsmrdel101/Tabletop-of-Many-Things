import HomeButtonList from "@/components/home/HomeButtonList";
import Layout from "@/components/Layout";
import UserBox from "@/components/UserBox";


export default function Home() {
  return (
    <Layout>
      <main className="home">
        <h1>Tabletop of<br/>Many Things</h1>

        <UserBox />
        <HomeButtonList />
      </main>
    </Layout>
  );
}
