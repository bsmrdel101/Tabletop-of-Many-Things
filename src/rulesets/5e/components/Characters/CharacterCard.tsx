import { formatCharacterCardClasses } from "@/scripts/tools/utils";
import Button from "@/components/Library/Button";
import Link from "@/components/Library/Link";

interface Props {
  character: CharacterCard_5e
  deleteFn: (character: CharacterCard_5e) => void
}


export default function CharacterCard({ character, deleteFn }: Props) {
  return (
    <div className="character-card">
      <img src={character.img} alt="Character image" />
      <div>
        <h3 data-testid="name">{ character.name } <span><em>Lvl { character.lvl }</em></span></h3>
        <p>{ formatCharacterCardClasses(character.classes) }</p>
        <p>{ character.race }{ character.subrace ? ` (${character.subrace})` : '' }</p>
        <p>{ character.background }</p>
        <Button
          variants={['dark', 'thin', 'link']}
          className="character-card__open-btn"
        >
          <Link to={`/characters/${character.id}?ruleset=${character.ruleset}`}>Open</Link>
        </Button>
        <p className="character-card__ruleset" data-testid="ruleset">{ character.ruleset }</p>
      </div>

      <Button
        variants={['X']}
        className="character-card__delete-btn"
        onClick={() => deleteFn(character)}
        data-testid="delete-btn"
      >
        <img src="/images/icons/trash.svg" alt="Delete btn" draggable={false} />
      </Button>
    </div>
  );
}
