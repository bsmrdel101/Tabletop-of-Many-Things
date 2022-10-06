import sidebar from '../components/sidebar';
import toolbar from '../components/toolbar';
import grid from '../components/grid';


export default function gamePage() {
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
