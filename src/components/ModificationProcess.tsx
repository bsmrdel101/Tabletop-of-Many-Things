import { ReactNode, useState } from "react";
import Button from "./library/Button";
import { ask } from "@/scripts/tools/interactions";

export interface ModificationStep {
  name: string;
  content: ReactNode;
  changesRequired: boolean;
  disabled?: boolean
}

interface Props {
  open: boolean;
  onClose: () => void;
  steps: ModificationStep[];
  className?: string
}


export default function ModificationProcess({ open, onClose, steps, className }: Props) {
  const [selectedStep, setSelectedStep] = useState<number>(0);

  const onClickFinish = async () => {
    const step = steps.find((s) => s.changesRequired);
    if (step) {
      alert(`Changes required in ${step.name}.`);
      return;
    }

    if (!await ask('Are you sure you want to finish?')) return;
    setSelectedStep(0);
    onClose();
  };

  const onClickCancel = async () => {
    if (!await ask('Changes will not be saved, are you sure you want to leave?')) return;
    setSelectedStep(0);
    onClose();
  };


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
                disabled={item.disabled ?? false}
              >
                { item.name }
                { item.changesRequired ? <span> (!)</span> : null }
              </Button>
            );
          })}

          <br />
          <Button
            className="modification-process__sidebar-btn"
            onClick={onClickFinish}
          >
            Finish
          </Button>
          <Button
            className="modification-process__sidebar-btn"
            onClick={onClickCancel}
          >
            Cancel
          </Button>
        </div>

        <div className={`modification-process__content${className ? ` ${className}` : ''}`}>
          { steps[selectedStep].content }
        </div>
      </dialog>
    </div>
  );
}
