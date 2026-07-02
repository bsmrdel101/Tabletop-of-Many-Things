import { gameAtom } from "@/scripts/atoms/state";
import { useAtom } from "jotai";

interface Props {
  character: CharacterDraft_Dnd
  updateCharacter: (value: CharacterDraft_Dnd) => void
}


export default function RaceStep({ character, updateCharacter }: Props) {
  const [game] = useAtom<Game | null>(gameAtom);


  return (
    <div className="race-step">
      
    </div>
  );
}

export const isRaceComplete = (character: CharacterDraft_Dnd): boolean => {
  return !!character;
};
