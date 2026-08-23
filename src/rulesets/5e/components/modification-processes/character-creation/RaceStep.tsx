import Button from "@/components/library/Button";
import { getAllRaces } from "@/rulesets/dnd/services/racesService";
import { gameAtom } from "@/scripts/atoms/state";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useState } from "react";

interface Props {
  character: CharacterDraft_5e
  updateCharacter: (value: CharacterDraft_5e) => void
}


export default function RaceStep({ character, updateCharacter }: Props) {
  const [game] = useAtom<Game | null>(gameAtom);
  const [selectedRace, setSelectedRace] = useState<Race_5e | null>(null);
  const [selectedSubrace, setSelectedSubrace] = useState<Subrace_5e | null>(null);
  
  const { data: races = [] } = useQuery<Race_5e[]>({
    queryKey: ['races', game],
    queryFn: () => getAllRaces(game!.id),
    enabled: !!game
  });


  return (
    <div className="race-step">
      <div style={{ display: 'flex' }}>
        <div className="race-step__race-options">
          {races.map((race) => {
            const isSelectedRace = selectedRace?.id === race.id;
            
            return (
              <div key={race.id} className="race-step__race-option">
                <Button
                  style={(isSelectedRace && selectedRace?.subraces.length > 0) ? { backgroundColor: 'var(--purple-dark-3)' } : {}}
                  onClick={() => setSelectedRace(race)}
                >
                  { race.name }
                </Button>

                {(isSelectedRace && race.subraces.length > 0) &&
                  <div className="race-step__subrace-options">
                    {race.subraces.map((subrace) => {
                      const isSelectedSubrace = selectedSubrace?.id === subrace.id;

                      return (
                        <Button
                          style={isSelectedSubrace ? { backgroundColor: 'var(--purple-dark-3)' } : {}}
                          onClick={() => setSelectedSubrace(subrace)}
                        >
                          { subrace.name }
                        </Button>
                      );
                    })}
                  </div>
                }
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const isRaceComplete = (character: CharacterDraft_5e): boolean => {
  return !!character.race;
};
