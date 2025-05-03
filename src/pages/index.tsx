import HomeButtonList from "@/containers/Home/HomeButtonList";
import UserBox from "@/components/UserBox";


export default function Home() {
  return (
    <main className="home">
      <h1>Tabletop of<br/>Many Things</h1>

      <UserBox />
      <HomeButtonList />
    </main>
  );
}
