import { deleteCharacter } from "../scripts/controllers/5e/charactersController";
import Button from "./Library/Button";

interface Props {
  char: Character
  characters: Character[]
  setCharacters: (data: Character[]) => void
}


export default function CharacterCard({ char, characters, setCharacters }: Props) {
  const subtitle = [char.race, ...char.classes.map((c) => c.name), char.background].filter((c) => c).join(', ');
  
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
            variant={['link', 'bold', 'hover']}
          >
            <a href={`/characters/${char.id}`}>Open</a>
          </Button>
          <Button
            onClick={() => handleDelete(char.id)}
            variant={['danger', 'bold']}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
