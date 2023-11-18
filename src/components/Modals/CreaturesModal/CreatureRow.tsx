import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { store } from "../../../redux/store";
import CreatureStatsModal from "../CreatureStatsModal";
import { Creature } from "../../../scripts/types";
import DraggableToken from "../../DraggableToken";


interface Props {
  creature: Creature
}

export const openCreatureWindow = async (creature: Creature) => {
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

export default function CreatureRow({ creature }: Props) {
  return (
    <div className="modal-creatures__row" onClick={() => openCreatureWindow(creature)}>
      <h3>{ creature.name }</h3>
      {creature.asset &&
        <DraggableToken
          asset={creature.asset}
          creature={creature}
          className="modal-creatures__token"
        />
      }
    </div>
  );
}
