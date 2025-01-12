import { FormEvent, useState } from "react";
import Dialog from "../../../Library/Dialog";
import Input from "../../../Library/Input";
import Button from "../../../Library/Button";
import ListDisplay from "../../../ListDisplay";
import { editCharacter } from "../../../../scripts/controllers/5e/charactersController";
import { emitServerEvent } from "../../../../scripts/config/socket-io";

interface Props {
  open: boolean
  setOpen: (value: boolean) => void
  character: Character_5e
  room: string
}


export default function EditArmorDialog({ open, setOpen, character, room }: Props) {
  const [acMod, setAcMod] = useState<number>(character.acMod);
  const [acOverride, setAcOverride] = useState<number>(character.acOverride);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const ac = Number(acOverride) > 0 ? Number(acOverride) : 10 + Number(acMod);
    const char = { ...character, ac, acMod: Number(acMod), acOverride: Number(acOverride) };
    emitServerEvent('UPDATE_PLAYER', [char, room]);
    await editCharacter(char);
  };


  return (
    <Dialog
      variants={['basic']}
      open={open}
      setOpen={setOpen}
      title="Edit Armor Class"
      width="20rem"
      className="edit-armor-dialog"
    >
      <form onSubmit={handleSubmit}>
        <div className="edit-armor-dialog__content">
          <div>
            <Input
              variants={['label-bold', 'label-stack', 'x-small']}
              label="AC Mod"
              value={acMod}
              onChange={(e: any) => setAcMod(e.target.value)}
              type="number"
              required
            />
            <Input
              variants={['label-bold', 'label-stack', 'x-small']}
              label="AC Override"
              value={acOverride}
              onChange={(e: any) => setAcOverride(e.target.value)}
              type="number"
              required
            />
            <Button type="submit" variants={['save', 'bold']}>Save</Button>
          </div>

          <div className="edit-armor-dialog__items">
            <ListDisplay title="Armor" data={[]} placeholder="Add armor to inventory" />
            <ListDisplay title="Shields" data={[]} placeholder="Add shield to inventory" />
          </div>
        </div>
      </form>
    </Dialog>
  );
}
