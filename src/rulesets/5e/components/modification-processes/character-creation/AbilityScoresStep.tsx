import { gameAtom } from "@/scripts/atoms/state";
import { useAtom } from "jotai";

interface Props {
  character: CharacterDraft_Dnd
  updateCharacter: (value: CharacterDraft_Dnd) => void
}


export default function AbilityScoresStep({ character, updateCharacter }: Props) {
  const [game] = useAtom<Game | null>(gameAtom);


  return (
    <div className="ability-scores-step">
      
    </div>
  );
}

export const isAbilityScoresComplete = (character: CharacterDraft_Dnd): boolean => {
  return !!character;
};
