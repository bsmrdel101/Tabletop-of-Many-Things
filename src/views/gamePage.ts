import sidebar from '../components/sidebar';
import toolbar from '../components/toolbar';
import grid from '../components/grid';
import { ready } from '../scripts/tools/utils';
import { getCreatures, getCustomCreatures } from '../controllers/creaturesController';


export default function gamePage() {
    ready(async () => {
        await getCustomCreatures();
        await getCreatures();
    }, '.game-page');

    return (`
        <div class="game-page">
            ${sidebar()}
            <div class="game-content">
                ${toolbar()}
                <div class="grid-container">
                    ${grid()}
                </div>
            </div>
        </div>
    `);
}
