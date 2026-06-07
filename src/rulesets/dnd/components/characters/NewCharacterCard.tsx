import { FormEvent, useState } from "react";
import Button from "@/components/library/Button";
import Input from "@/components/library/Input";
import RulesetSelect5e from "@/components/library/select/RulesetSelect5e";
import FileInput from "@/components/library/FileInput";

interface Props {
  setOpen: (value: boolean) => void
  onCreateCharacter: (img: File | null, ruleset: Ruleset) => void
}


export default function NewCharacterCard({ setOpen, onCreateCharacter }: Props) {
  const [img, setImg] = useState<File | null>(null);
  const [ruleset, setRuleset] = useState<Ruleset | ''>('');
  const DEFAULT_IMG = '/images/defaults/character.png';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (ruleset === '') return;
    
    onCreateCharacter(img, ruleset);
  };


  return (
    <form className="character-card new-character-card" onSubmit={handleSubmit}>
      <Button
        variants={['X']}
        onClick={() => setOpen(false)}
        data-testid="delete-btn"
      >
        X
      </Button>

      <FileInput
        defaultImg={DEFAULT_IMG}
        onChange={(files) => setImg(files[0])}
        accept="image/*"
      />

      <div className="new-character-card__inputs">
        <RulesetSelect5e
          variants={['fit']}
          value={ruleset}
          onChange={(value) => setRuleset(value)}
          required
        />
      </div>

      <Button variants={['dark']} type="submit" data-testid="submit-btn">Submit</Button>
    </form>
  );
}
