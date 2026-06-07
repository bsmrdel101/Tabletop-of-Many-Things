import { ReactNode, useState } from "react";
import Button from "./library/Button";

export interface ModificationStep {
  name: string;
  content: ReactNode;
  changesRequired: boolean;
}

interface Props {
  open: boolean;
  onClose: () => void;
  steps: ModificationStep[];
  className?: string
}


export default function ModificationProcess({ open, onClose, steps, className }: Props) {
  const [selectedStep, setSelectedStep] = useState<number>(0);


  if (!open) return null;

  return (
    <div className="modification-process__overlay">
      <dialog className="modification-process" open={open}>
        <div className="modification-process__sidebar">
          {steps.map((item, i) => {
            return (
              <Button
                key={i}
                className={`modification-process__sidebar-btn${selectedStep === i ? ' modification-process__sidebar-btn--active' : ''}`}
                onClick={() => setSelectedStep(i)}
              >
                { item.name }
                { item.changesRequired ? '(!)' : null }
              </Button>
            );
          })}

          <Button
            className="modification-process__sidebar-btn"
            onClick={onClose}
          >
            Finish
          </Button>
        </div>

        <div className={`modification-process__content${className ? ` ${className}` : ''}`}>
          { steps[selectedStep].content }
        </div>
      </dialog>
    </div>
  );
}
