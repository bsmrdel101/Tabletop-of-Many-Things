import Button from "@/components/library/Button";
import Checkbox from "@/components/library/Checkbox";
import Input from "@/components/library/Input";
import { gameAtom } from "@/scripts/atoms/state";
import { getGameById } from "@/services/dashboardService";
import { useAtom } from "jotai";
import { FormEvent, useState } from "react";

interface Props {
  character: CharacterDraft_Dnd
  updateCharacter: (value: CharacterDraft_Dnd) => void
}


export default function SetupStep({ character, updateCharacter }: Props) {
  const [game, setGame] = useAtom<Game | null>(gameAtom);
  const [room, setRoom] = useState('');

  const onSubmitJoinGame = async (e: FormEvent) => {
    e.preventDefault();
    const res = await getGameById(room);
    setGame(res);
  };


  return (
    <div className="setup-step">
      <h2>Character</h2>

      <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '1rem', justifyContent: 'center' }}>
        <Input
          label="Name"
          value={character.name}
          onChange={(e) => updateCharacter({ ...character, name: e.target.value}) }
        />
        <Input
          variants={['small']}
          label="Starting Lvl"
          value={character.lvl || ''}
          onChange={(e) => updateCharacter({ ...character, lvl: Math.max(Number(e.target.value), 0)}) }
          type="number"
        />
      </div>

      <hr />
      {!game &&
        <p style={{ marginBottom: '0.9rem' }}>
          <em style={{ fontSize: 'var(--font-sm)' }}>These steps can be done later.<br />Joining a game will give you access to the content in that game.</em>
        </p>
      }

      <h2>{ !game ? 'Join ' : '' }Game</h2>
      <div className="setup-step__join-game">
        {game ?
          <>
            <p style={{ color: 'var(--green-1)' }}><strong>{ game.name }</strong></p>
            <Button variants={['thin']} onClick={() => setGame(null)}>Leave Game</Button>
          </>
          :
          <>
            <Button variants={['dark', 'thin']}>Friends</Button>
            <p>OR</p>
            <form className="setup-step__join-game-code" onSubmit={onSubmitJoinGame}>
              <Input
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Room Code"
              />
              <Button variants={['thin']} type="submit">Join</Button>
            </form>
          </>
        }
      </div>

      <h2>Settings</h2>
      {game &&
        <p><em style={{ fontSize: 'var(--font-sm)' }}>Settings are synchronized with { game.name }</em></p>
      }
      <div style={game ? { color: 'var(--grey-light-0)' } : {}}>
        <Checkbox
          label="Use XP"
          disabled={!!game}
        />
        <Checkbox
          label="Use coin weight"
          disabled={!!game}
        />
        <Checkbox
          label="Track normal arrows"
          disabled={!!game}
        />
        <Checkbox
          label="Allow rolling for stats"
          disabled={!!game}
        />
      </div>
    </div>
  );
}

export const isSetupComplete = (character: CharacterDraft_Dnd): boolean => {
  return !!character.img && !!character.name && !!character.lvl;
};
