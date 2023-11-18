import { useEffect } from "react";
import { makeDraggable } from "../../../scripts/tools/utils";
import { Creature } from "../../../scripts/types";
import CreatureRow from "./CreatureRow";
import { useAppSelector } from "../../../redux/hooks";
import { fetchCreaturesData } from "../../../redux/reducers/creaturesSlice";


export default function CreaturesModal() {
  const creatures: Creature[] = useAppSelector(fetchCreaturesData);

  useEffect(() => {
    makeDraggable(document.getElementById('modal-creatures'), '.modal__header-container');
  }, []);

  const closeModal = () => {
    document.getElementById('modal-creatures').classList.add('hidden');
  };


  return (
    <div className="modal modal-creatures hidden" id="modal-creatures">
      <div className="modal__header-container">
        <h2 className="modal__title">Creatures</h2>
        <button className="modal__close-btn" onClick={closeModal}>X</button>
      </div>
      <div className="modal__filters">
        <div className="modal__filters--search">
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
              <button type="submit" className="btn--search">
                <img src="/images/magnifying-glass.svg" alt="magnifying glass" />
              </button>
            </label>
          </form>
        </div>
        <button className="btn--hover" id="new-creature-btn">New Creature</button>
      </div>
      <form className="modal-creatures__form"></form>
      {creatures.map((creature: Creature, i) => {
        return <CreatureRow key={i} creature={creature} />;
      })}
    </div>
  );
}
