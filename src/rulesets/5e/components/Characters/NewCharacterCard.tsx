import { FormEvent, useState } from "react";
import Button from "@/components/Library/Button";
import Input from "@/components/Library/Input";
import RulesetSelect5e from "@/components/Library/Select/RulesetSelect5e";
import FileInput from "@/components/Library/FileInput";

interface Props {
  setOpen: (value: boolean) => void
  onCreateCharacter: (name: string, img: File | null, ruleset: string) => void
}


export default function NewCharacterCard({ setOpen, onCreateCharacter }: Props) {
  const [img, setImg] = useState<File | null>(null);
  const [name, setName] = useState('Unnamed Character');
  const [ruleset, setRuleset] = useState('5e');
  const DEFAULT_IMG = '/images/defaults/character.png';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onCreateCharacter(name, img, ruleset);
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
        <Input
          variants={['label-large']}
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          data-testid="name"
        />
        <RulesetSelect5e
          variants={['fit']}
          value={ruleset}
          onChange={(e) => setRuleset(e.target.value)}
        />
      </div>

      <Button variants={['dark']} type="submit" data-testid="submit-btn">Submit</Button>
    </form>
  );
}
