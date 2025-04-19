import AbilityScore from "./AbilityScore";

interface Props {
  character: Character_5e
  editing: boolean
  room: string
}


export default function AbilityScores({ character, editing, room }: Props) {
  return (
    <div className="ability-scores-list">
      {character.abilityScores.map((score, i) => {
        return (
          <AbilityScore key={i} character={character} ability={score} editing={editing} room={room} index={i} />
        );
      })}
    </div>
  );
}
