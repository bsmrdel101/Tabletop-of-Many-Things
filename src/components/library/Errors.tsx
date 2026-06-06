import Button from "./Button";


export default function Errors() {
  const handleClose = () => {
    const container = document.querySelector('.errors-list');
    if (!container) return;

    container.innerHTML = '';
  };

  
  return (
    <div className="errors">
      <Button variants={['X']} onClick={handleClose}>
        X
      </Button>

      <div className="errors-list"></div>
    </div>
  );
}

const toErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'Unknown error';
};

export function showError(error: unknown) {
  console.error(error);

  const container = document.querySelector('.errors-list');
  if (!container) return;

  const msg = toErrorMessage(error);

  const el = document.createElement('div');
  el.textContent = msg;
  el.classList.add('error');

  container.appendChild(el);
}
