import GameNavbar from "./GameNavbar";
import MainNavbar from "./MainNavbar";


export default function Navbar() {
  if (location.pathname === 'vtt') {
    return <GameNavbar />;
  } else {
    return <MainNavbar />;
  }
}
