import { createRoot } from "react-dom/client";
import { getCreature } from "../../../scripts/controllers/creaturesController";
import { Creature } from "../../../scripts/creatureDataStructure";
import { MinifiedCreature } from "../../../scripts/types";
import { Provider } from 'react-redux';
import { store } from "../../../redux/store";
import CreatureStatsModal from "../CreatureStatsModal";


interface Props {
  minCreature: MinifiedCreature
}

export default function CreatureRow({ minCreature }: Props) {
  // Create and append creature stats modal on screen
  const openCreatureWindow = async () => {
    if (document.getElementById(`modal-stats-${minCreature.index}`)) {
      document.getElementById(`modal-stats-${minCreature.index}`).remove();
    }
    const creature: Creature = await getCreature(minCreature.index, minCreature.url ? false : true);
    const div = document.querySelector('body').appendChild(document.createElement('div'));
    const container = createRoot(div);
    container.render(
      <Provider store={store}>
        <CreatureStatsModal creature={creature} />
      </Provider>
    );
  };


  return (
    <div className="modal-creatures__row" onClick={openCreatureWindow}>
      <h3>{ minCreature.name }</h3>
    </div>
  );
}
