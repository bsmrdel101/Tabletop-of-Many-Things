import HomeButtonList from "@/components/Home/HomeButtonList";
import UserBox from "@/components/Home/UserBox";


export default function Home() {
  return (
    <div className="home">
      <h1>Tabletop of<br/>Many Things</h1>

      <UserBox />
      <HomeButtonList />
    </div>
  );
}
