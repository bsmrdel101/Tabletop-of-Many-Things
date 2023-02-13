import React from "react";
import { capitalize } from "../../../../scripts/tools/stringUtils";
import { Spell } from "../../../../scripts/types";
import "./CreatureStatsModal.scss";


interface Props {
  spell: Spell
}

export default function CreatureSpellDetails({ spell }: Props) {
  return (
    <div className="modal-stats__spell-details">
      <h4>{spell.name}</h4>
      <p className="modal-stats__spell-details--subtitle">{spell.level === 0 ? 'cantrip' : `${spell.level}st level`} {spell.school} ${spell.ritual ? '(ritual)' : ''}</p>
      <p><span className="bold">Casting Time</span> {spell.castingTime}</p>
      <p><span className="bold">Range</span> {spell.range}</p>
      <p><span className="bold">Components</span> {spell.components.map((component: string) => capitalize(component))} ${spell.material ? `(${spell.material})` : ''}</p>
      <p><span className="bold">Duration</span> {spell.duration}</p>
      <p><span className="bold">Classes</span> {spell.classes.map((_class: string) => capitalize(_class))}</p>
      <p className="modal-stats__spell-details--desc">{spell.desc}</p>
    </div>
  );
}
