import React, { useEffect, useState } from "react";
import { makeDraggable } from "../../../scripts/tools/utils";
import { MinifiedCreature } from "../../../scripts/types";
import CreatureRow from "./CreatureRow";
import { getAllCreatures } from "../../../scripts/controllers/creaturesController";


export default function CreaturesModal() {
  const [creatures, setCreatures] = useState<MinifiedCreature[]>([]);

  useEffect(() => {
    makeDraggable(document.getElementById('modal-creatures'), '.modal__title');
    
    const fetchData = async () => {
      setCreatures(await getAllCreatures());
    };
    fetchData();
  }, []);

  const closeModal = () => {
    document.getElementById('modal-creatures').classList.add('hidden');
  };


  return (
    <div className="modal modal-creatures hidden" id="modal-creatures">
      <h2 className="modal__title">Creatures</h2>
      <button className="modal__close-btn" onClick={closeModal}>X</button>
      <div className="modal__filters">
        <label>
          <select id="creatures-list-filter">
            <option value="all">All creatures</option>
            <option value="standard">Standard</option>
            <option value="custom">Custom</option>
          </select>
        </label>
        <form>
          <label className="relative">
            <input placeholder="search" />
            <button type="submit" className="btn--search"><i className="fa-solid fa-magnifying-glass"></i></button>
          </label>
        </form>
        <button className="btn--hover" id="new-creature-btn">New Creature</button>
      </div>
      <form className="modal-creatures__form"></form>
      {creatures.map((creature: MinifiedCreature, i) => {
        return <CreatureRow key={i} minCreature={creature} />;
      })}
    </div>
  );
}
