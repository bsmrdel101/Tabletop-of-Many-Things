import Immunities from "../stat-block/Immunities"
import Languages from "../stat-block/Languages"
import Movement from "../stat-block/Movement"
import Proficiencies from "../stat-block/Proficiencies"
import Resistances from "../stat-block/Resistances"
import Senses from "../stat-block/Senses"
import Vulnerabilities from "../stat-block/Vulnerabilities"

interface Props {
  character: Character_Dnd
}


export default function Attributes({ character }: Props) {
  return (
    <div className="character-sheet-attributes">
      <div className="character-sheet-attributes__row">
        {character.speeds.length > 0 &&
          <Movement speeds={character.speeds} />
        }
        {character.senses.length > 0 &&
          <Senses senses={character.senses} />
        }
        {character.resistances.length > 0 &&
          <Resistances resistances={character.resistances} />
        }
        {character.condImmunities.length > 0 &&
          <Immunities immunities={[...character.condImmunities, ...character.dmgImmunities]} />
        }
        {character.vulnerabilities.length > 0 &&
          <Vulnerabilities vulnerabilities={character.vulnerabilities} />
        }
      </div>

      <Proficiencies proficiencies={character.proficiencies} />

      <div className="character-sheet-attributes__row">
        {character.languages.length > 0 &&
          <Languages languages={character.languages} />
        }
      </div>
    </div>
  )
};
