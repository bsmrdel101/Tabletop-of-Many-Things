import { deleteCharacter } from "../scripts/controllers/5e/charactersController";
import { getCharacterSubtitle } from "../scripts/tools/5e/characterUtils";
import Button from "./Library/Button";

interface Props {
  char: Character
  characters: Character[]
  setCharacters: (data: Character[]) => void
}


export default function CharacterCard({ char, characters, setCharacters }: Props) {
  const subtitle = getCharacterSubtitle(char);
  
  const handleDelete = async (id: number) => {
    await deleteCharacter(id);
    setCharacters(characters.filter((c) => c.id !== id));
  };


  return (
    <div className="characters-page-character-card">
      <img src={char.img} alt={`${char.name} picture`} />

      <div className="characters-page-character-card__content">
        <h3>{ char.name }</h3>
        <p>{ subtitle }</p>
        <p className="character-card__ruleset">{ char.ruleset }</p>
        <div className="character-card__buttons">
          <Button
            variants={['link', 'bold', 'hover']}
          >
            <a href={`/characters/${char.id}`}>Open</a>
          </Button>
          <Button
            onClick={() => handleDelete(char.id)}
            variants={['danger', 'bold']}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
