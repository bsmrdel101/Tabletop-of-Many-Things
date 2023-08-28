import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { store } from "../../../redux/store";
import CreatureStatsModal from "../CreatureStatsModal";
import { Creature } from "../../../scripts/types";


interface Props {
  creature: Creature
}

export default function CreatureRow({ creature }: Props) {
  // Create and append creature stats modal on screen
  const openCreatureWindow = async () => {
    if (document.getElementById(`modal-stats-${creature.id}`)) {
      document.getElementById(`modal-stats-${creature.id}`).remove();
    }
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
      <h3>{ creature.name }</h3>
    </div>
  );
}
