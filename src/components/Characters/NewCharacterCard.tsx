import { FormEvent, useState } from "react";
import Button from "../Library/Button";
import Input from "../Library/Input";
import RulesetSelect5e from "../Library/Select/RulesetSelect5e";
import FileInput from "../Library/FileInput";
import { addCharacter } from "@/services/5e/charactersService";

interface Props {
  setOpen: (value: boolean) => void
}


export default function NewCharacterCard({ setOpen }: Props) {
  const [img, setImg] = useState<File | null>(null);
  const [name, setName] = useState('Unnamed Character');
  const [ruleset, setRuleset] = useState('');
  const DEFAULT_IMG = '/images/defaults/character.png';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const url = img ? URL.createObjectURL(img) : DEFAULT_IMG;
    await addCharacter(name, url, ruleset);
  };


  return (
    <form className="character-card new-character-card" onSubmit={handleSubmit}>
      <Button
        variants={['X']}
        onClick={() => setOpen(false)}
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
        />
        <RulesetSelect5e
          variants={['fit']}
          value={ruleset}
          onChange={(e) => setRuleset(e.target.value)}
        />
      </div>

      <Button variants={['dark']} type="submit">Submit</Button>
    </form>
  );
}
