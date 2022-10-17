export default function modal(id: string, header: string) {
    return `
        <div class="modal" id="${id}-modal">
            <button class="btn--modal-close" id="${id}-modal-close-btn">X</button>
            ${header}
            <div class="${id}-modal__body"></div>
        </div>
    `;
}
