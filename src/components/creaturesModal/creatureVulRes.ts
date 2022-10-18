import { getCreatureVulResData } from "../../scripts/creatureStatsHandler";
import { ready } from "../../scripts/tools/utils";
import { Creature } from "../../scripts/types";

export default function creatureVulRes(creature: Creature) {
    ready(() => {
        const { vul, res, dmgImmune, conImmune } = getCreatureVulResData(creature);
        document.getElementById(`vul-res--${creature.index}`).insertAdjacentHTML('beforeend', `
            ${vul && `<p><span class="bold">Vulnerabilities</span> ${vul}</p>`}
            ${res && `<p><span class="bold">Resistances</span> ${res}</p>`}
            ${dmgImmune && `<p><span class="bold">Damage Immunities</span> ${dmgImmune}</p>`}
            ${conImmune && `<p><span class="bold">Condition Immunities</span> ${conImmune}</p>`}
        `);
    }, `#vul-res--${creature.index}`);

    return `
        <div class="creature-stats-window__vul-res" id="vul-res--${creature.index}"></div>
    `;
}
