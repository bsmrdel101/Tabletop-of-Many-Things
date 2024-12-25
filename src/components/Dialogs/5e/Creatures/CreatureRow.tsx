import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { store } from "../../../../redux/store";
import DraggableToken from "../../../DraggableToken";
import CreatureStatsDialog from "./CreatureStatsDialog";

interface Props {
  creature: Creature_5e
}


export const openCreatureWindow = async (creature: Creature_5e) => {
  if (!creature) return;
  const div = document.querySelector('body').appendChild(document.createElement('div'));
  const container = createRoot(div);
  container.render(
    <Provider store={store}>
      <CreatureStatsDialog creature={creature} />
    </Provider>
  );
};

export default function CreatureRow({ creature }: Props) {
  return (
    <div className="creatures-dialog__row" onClick={() => openCreatureWindow(creature)}>
      <p>{ creature.name }</p>
      {creature.asset &&
        <DraggableToken
          asset={creature.asset}
          creature={creature}
          className="creatures-dialog__token"
        />
      }
    </div>
  );
}
