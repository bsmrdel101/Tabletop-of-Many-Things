interface Props {
  character: Character_5e
}


export default function AbilityScores({ character }: Props) {
  return (
    <div className="ability-scores-list">
      {character.abilityScores.map((score, i) => {
        return (
          <div key={i} className="ability-score">
            <div className="ability-score__title">
              {score.prof && <img src="/images/icons/star.svg" alt="proficient" draggable={false} /> }
              <p>{ score.name.toUpperCase() }</p>
            </div>
            <p className="ability-score__value">{ score.value }</p>
            <p className="ability-score__mod">{ score.mod >= 0 ? '+' : '' }{ score.mod }</p>
          </div>
        );
      })}
    </div>
  );
}
