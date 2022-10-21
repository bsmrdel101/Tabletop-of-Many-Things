import { submitCreatureForm } from "../scripts/submitNewCreature";
import { disableHotkeys, makeDraggable } from "../scripts/tools/utils";
import modal from "./modal";

let creatureFormOpen = false;

export const toggleNewCreatureForm = () => {
    creatureFormOpen = !creatureFormOpen;
    if (creatureFormOpen) {
        renderNewCreatureFormModal();
        bindEventsToNewCreatureForm();
    } else {
        document.querySelector('.creatures-window-form').remove();
    }
};

const bindEventsToNewCreatureForm =() => {
    document.getElementById('new-creature-form-modal-close-btn').addEventListener('click', () => {
        toggleNewCreatureForm();
    });
    document.getElementById('creatures-window-form').addEventListener('submit', (e: any) => {
        submitCreatureForm(e);
    });
};

const renderNewCreatureFormModal = () => {
    document.querySelector('body').insertAdjacentHTML('beforeend', 
        modal('new-creature-form', newCreatureFormHeaderHtml())
    );
    const window: HTMLElement = document.getElementById('new-creature-form-modal');
    const modalBody: HTMLElement = document.getElementById('new-creature-form-modal__body');
    window.classList.add('creatures-window-form');
    modalBody.insertAdjacentHTML('beforeend', creatureFormBodyHtml());
    disableHotkeys();
    makeDraggable(window, '.creatures-window-form__header');
};

const newCreatureFormHeaderHtml = () => `
    <div class="creatures-window-form__header modal__header">
        <h2>New Creature</h2>
    </div>
`;

const creatureFormBodyHtml = () => `
    <div class="creatures-content">
        <form class="creatures-window-form__body" id="creatures-window-form">
            <label>Token
                <input type="file">
            </label>
            <div class="creatures-window-form__body--box">
                <label>Name
                    <input required id="new-creature-input--name">
                </label>
                <label>Size
                    <select id="new-creature-input--size">
                        <option value="tiny">Tiny</option>
                        <option value="small">Small</option>
                        <option value="medium" selected>Medium</option>
                        <option value="large">Large</option>
                        <option value="huge">Huge</option>
                        <option value="gargantuan">Gargantuan</option>
                    </select>
                </label>
                <label>Type
                    <input class="input--md" id="new-creature-input--type">
                </label>
                <label>Alignment
                    <input class="input--sm" id="new-creature-input--alignment">
                </label>
                <label>AC
                    <input class="input--sm" type="number" id="new-creature-input--ac">
                </label>
                <label>Hit Points
                    <input class="input--sm" type="number" id="new-creature-input--hit-points">
                </label>
                <label>Hit Dice
                    <input class="input--sm" id="new-creature-input--hit-dice">
                </label>
            </div>
            <div class="creatures-window-form__body--box">
                <div>
                    <div class="form__input-add form__input-add--speed">
                        <label>Movement
                            <div class="flex-container">
                                <p>Walk</p>
                                <input placeholder="30" type="number" class="input--sm creature-inputs__speed-value" id="new-creature-input--walk">
                            </div>
                            <div class="flex-container">
                                <p>Swim</p>
                                <input placeholder="30" type="number" class="input--sm creature-inputs__speed-value" id="new-creature-input--swim">
                            </div>
                            <div class="flex-container">
                                <p>Burrow</p>
                                <input placeholder="30" type="number" class="input--sm creature-inputs__speed-value" id="new-creature-input--burrow">
                            </div>
                            <div class="flex-container">
                                <p>Fly</p>
                                <input placeholder="30" type="number" class="input--sm creature-inputs__speed-value" id="new-creature-input--fly">
                            </div>
                            <div class="flex-container">
                                <p>Climb</p>
                                <input placeholder="30" type="number" class="input--sm creature-inputs__speed-value" id="new-creature-input--climb">
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            <div class="creatures-window-form__body--box">
                <label>Str
                    <input class="input--sm" type="number" id="new-creature-input--str" placeholder="10">
                </label>
                <label>Dex
                    <input class="input--sm" type="number" id="new-creature-input--dex" placeholder="10">
                </label>
                <label>Con
                    <input class="input--sm" type="number" id="new-creature-input--con" placeholder="10">
                </label>
                <label>Int
                    <input class="input--sm" type="number" id="new-creature-input--int" placeholder="10">
                </label>
                <label>Wis
                    <input class="input--sm" type="number" id="new-creature-input--wis" placeholder="10">
                </label>
                <label>Char
                    <input class="input--sm" type="number" id="new-creature-input--char" placeholder="10">
                </label>
            </div>
            <div class="creatures-window-form__body--box">
                <div>
                    <div class="form__input-add form__input-add--proficiency">
                        <label>Proficiencies
                            <div class="flex-container">
                                <input placeholder="Perception" class="input--md creature-inputs__proficiency-name">
                                <input placeholder="6" type="number" class="input--sm creature-inputs__proficiency-value">
                            </div>
                        </label>
                    </div>
                    <button type="button" onclick="addInputs('proficiency')" class="creature-form__btn--input">Add proficiency</button>
                </div>
            </div>
            <div class="creatures-window-form__body--box">
                <label>Vulnerabilities
                    <textarea rows="3" cols="40" placeholder="fire, thunder" id="new-creature-input--vul"></textarea>
                </label>
            </div>
            <div class="creatures-window-form__body--box">
                <label>Resistances
                    <textarea rows="3" cols="40" placeholder="poison, bludgeoning" id="new-creature-input--res"></textarea>
                </label>
            </div>
            <div class="creatures-window-form__body--box">
                <label>Damage Immunities
                    <textarea rows="3" cols="40" placeholder="nonmagical slashing" id="new-creature-input--dmg-immune"></textarea>
                </label>
            </div>
            <div class="creatures-window-form__body--box">
                <label>Condition Immunities
                    <textarea rows="3" cols="40" placeholder="prone, restrained" id="new-creature-input--con-immune"></textarea>
                </label>
            </div>
            <div class="creatures-window-form__body--box">
                <div>
                    <div class="form__input-add form__input-add--sense">
                        <label>Senses
                            <div class="flex-container">
                                <input placeholder="Darkvision" class="input--md creature-inputs__sense-name">
                                <input placeholder="60" type="number" class="input--sm creature-inputs__sense-value">
                            </div>
                        </label>
                    </div>
                    <button type="button" onclick="addInputs('sense')" class="creature-form__btn--input">Add sense</button>
                </div>
            </div>
            <div class="creatures-window-form__body--box">
                <label>Languages
                    <textarea rows="3" cols="40" id="new-creature-input--languages"></textarea>
                </label>
            </div>
            <div class="creatures-window-form__body--box">
                <label>CR
                    <input type="number" class="input--sm" id="new-creature-input--cr">
                </label>
                <label>XP
                    <input type="number" class="input--sm" id="new-creature-input--xp">
                </label>
            </div>
            <div class="creatures-window-form__body--box">
                <div>
                    <div class="form__input-add form__input-add--ability">
                        <label>Special Abilities
                            <input placeholder="Ability name" class="input--md creature-inputs__ability-name">
                            <textarea rows="3" cols="40" placeholder="description" class="creature-inputs__ability-desc"></textarea>
                        </label>
                    </div>
                    <button type="button" onclick="addDescInputs('ability')" class="creature-form__btn--input">Add ability</button>
                </div>
            </div>
            <div class="creatures-window-form__body--box">
                <div>
                    <div class="form__input-add form__input-add--action">
                        <label>Actions
                            <input placeholder="Action name" class="input--md creature-inputs__action-name">
                            <textarea rows="3" cols="40" placeholder="description" class="creature-inputs__action-desc"></textarea>
                        </label>
                    </div>
                    <button type="button" onclick="addDescInputs('action')" class="creature-form__btn--input">Add action</button>
                </div>
            </div>
            <div class="creatures-window-form__body--box">
                <div>
                    <div class="form__input-add form__input-add--leg-action">
                        <label>Legendary Actions
                            <input placeholder="Action name" class="input--md creature-inputs__leg-action-name">
                            <textarea rows="3" cols="40" placeholder="description" class="creature-inputs__leg-action-desc"></textarea>
                        </label>
                    </div>
                    <button type="button" onclick="addDescInputs('leg-action')" class="creature-form__btn--input">Add Legendary action</button>
                </div>
            </div>
            <br/>
            <button type="submit">Add Creature</button>
        </form>
    </div>
`;
