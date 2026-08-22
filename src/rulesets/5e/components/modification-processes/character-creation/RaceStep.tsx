import { gameAtom } from "@/scripts/atoms/state";
import { useAtom } from "jotai";

interface Props {
  character: CharacterDraft_5e
  updateCharacter: (value: CharacterDraft_5e) => void
}


export default function RaceStep({ character, updateCharacter }: Props) {
  const [game] = useAtom<Game | null>(gameAtom);
  console.log(character);
  

  return (
    <div className="race-step">
      
    </div>
  );
}

export const isRaceComplete = (character: CharacterDraft_5e): boolean => {
  return !!character;
};
