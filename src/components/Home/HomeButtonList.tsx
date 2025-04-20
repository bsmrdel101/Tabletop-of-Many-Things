import { useState } from "react";
import Button from "../Library/Button";
import GamesList from "./GamesList";
import Link from "../Library/Link";


export default function HomeButtonList() {
  const [menu, setMenu] = useState('');


  return (
    <div className="home__button-list">
      {!menu &&
        <>
          <Button onClick={() => setMenu('play')}>Play</Button>
          <Button variants={['dark', 'link']}>
            <Link to="/characters">Characters</Link>
          </Button>
        </>
      }
      {menu === 'play' &&
        <GamesList setMenu={setMenu} />
      }
    </div>
  );
}
