import Button from "./Button";


let errorsClosed = false;

export default function Errors() {
  const handleClose = () => {
    const container = document.querySelector('.errors');
    if (!container) return;

    errorsClosed = true;
    container.innerHTML = '';
    container.classList.remove('error');
  };


  return (
    <div className="errors">
      <Button variants={['X']} onClick={handleClose}>X</Button>
    </div>    
  );
}


const toErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'Unknown error';
};

export function showError(error: unknown) {
  const container = document.querySelector('.errors');
  if (!container) return;

  const msg = toErrorMessage(error);
  const el = document.createElement('div');
  el.textContent = msg;
  container.appendChild(el);
  el.classList.add('error');
}
