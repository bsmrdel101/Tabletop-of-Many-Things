import { FormEvent } from "react";
import Button from "../library/Button";
import Input from "../library/Input";


export default function JoinGame() {
  const handleJoinGame = async (e: FormEvent) => {
    e.preventDefault();
  };


  return (
    <div>
      <form className="play__join-game" onSubmit={handleJoinGame}>
        <Input
          variants={['fit', 'label-large']}
          label="Join Game"
          placeholder="Room code"
          required
        />
        <Button type="submit">Join</Button>
      </form>
    </div>
  );
}
