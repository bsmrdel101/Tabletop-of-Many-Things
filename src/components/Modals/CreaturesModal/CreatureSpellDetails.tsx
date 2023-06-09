import { useEffect, useState } from "react";
import { capitalize } from "../../../scripts/tools/stringUtils";
import { Spell } from "../../../scripts/types";
import { getApiSpell } from "../../../scripts/controllers/spellsController";


interface Props {
  url: string
}

export default function CreatureSpellDetails({ url }: Props) {
  const [spell, setSpell] = useState<Spell>(null);

  useEffect(() => {
    const fetchSpell = async () => {
      setSpell(await getApiSpell(url));
    };
    fetchSpell();
  }, []);


  return (
    <div className="modal-stats__spell-details">
      {spell &&
        <>
          <h4>{spell.name}</h4>
          <p className="modal-stats__spell-details--subtitle">{spell.level === 0 ? 'cantrip' : `${spell.level}st level`} {spell.school} {spell.ritual ? '(ritual)' : ''}</p>
          <p><span className="bold">Casting Time:</span> {spell.castingTime}</p>
          <p><span className="bold">Range:</span> {spell.range}</p>
          <p><span className="bold">Components:</span> {spell.components.map((component: string) => capitalize(component)).join(' ')} {spell.material ? `(${spell.material})` : ''}</p>
          <p><span className="bold">Duration:</span> {spell.duration}</p>
          <p><span className="bold">Classes:</span> {spell.classes.map((_class: string) => capitalize(_class)).join(', ')}</p>
          <p className="modal-stats__spell-details--desc">{spell.desc}</p>
        </>
      }
    </div>
  );
}
