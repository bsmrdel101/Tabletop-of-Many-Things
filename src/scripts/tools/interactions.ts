export const ask = (msg: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    `;

    const modal = document.createElement("div");
    modal.style.cssText = `
      background: white;
      color: black;
      padding: 20px;
      border-radius: 8px;
      min-width: 300px;
      text-align: center;
    `;

    const text = document.createElement("p");
    text.textContent = msg;
    text.style.cssText = `
      margin-bottom: 1rem;
    `;

    const yesButton = document.createElement("button");
    yesButton.textContent = "Yes";
    yesButton.style.cssText = `
      margin-right: 0.5rem;
    `;

    const noButton = document.createElement("button");
    noButton.textContent = "No";

    yesButton.onclick = () => {
      overlay.remove();
      resolve(true);
    };

    noButton.onclick = () => {
      overlay.remove();
      resolve(false);
    };

    overlay.onclick = () => {
      overlay.remove();
      resolve(false);
    };

    window.onkeydown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      overlay.remove();
      resolve(false);
    };

    modal.append(text, yesButton, noButton);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    noButton.focus();
  });
};
