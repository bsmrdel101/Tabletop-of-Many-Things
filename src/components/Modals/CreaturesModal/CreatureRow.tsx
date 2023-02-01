import React from "react";
import { getCreature } from "../../../controllers/creaturesController";
import { CreatureStatsModal } from "../../../scripts/components/creatureStatsModal";
import { Creature } from "../../../scripts/creatureDataStructure";
import { MinifiedCreature } from "../../../scripts/types";
import './CreaturesModal.scss';


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
    const creatureStatsModal = new CreatureStatsModal(creature);
    document.querySelector('body').append(creatureStatsModal.el);
  };


  return (
    <div className="modal-creatures__row" onClick={openCreatureWindow}>
      <h3>{ minCreature.name }</h3>
    </div>
  );
}
