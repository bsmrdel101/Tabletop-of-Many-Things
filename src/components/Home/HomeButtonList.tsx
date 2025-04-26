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
          <Button variants={['large']} onClick={() => setMenu('play')}>Play</Button>
          <Button variants={['dark', 'link', 'large']}>
            <Link to="/characters">Characters</Link>
          </Button>
          <Button variants={['dark', 'link', 'large']}>
            <Link to="/homebrew">Homebrew</Link>
          </Button>
          <Button variants={['dark', 'link', 'large']}>
            <Link to="/settings">Settings</Link>
          </Button>
        </>
      }
      {menu === 'play' &&
        <GamesList setMenu={setMenu} />
      }
    </div>
  );
}
