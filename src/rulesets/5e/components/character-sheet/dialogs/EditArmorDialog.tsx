import Button from "@/components/library/Button";
import WindowDialog from "@/components/library/dialogs/WindowDialog";
import Input from "@/components/library/Input";
import { editCharacter } from "@/rulesets/5e/services/charactersService";
import { roomAtom } from "@/scripts/atoms/state";
import { emitServerEvent } from "@/scripts/config/socket-io";
import { useAtom } from "jotai";
import { FormEvent, useState } from "react";

interface Props {
  open: boolean
  setOpen: (value: boolean) => void
  character: Character_5e
}


export default function EditArmorDialog({ open, setOpen, character }: Props) {
  const [room] = useAtom(roomAtom);
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
    <WindowDialog
      open={open}
      setOpen={setOpen}
      title="Edit Armor Class"
      className="edit-armor-dialog"
      x={200}
      y={100}
    >
      <form onSubmit={handleSubmit}>
        <div className="edit-armor-dialog__content">
          <div>
            <Input
              variants={['small']}
              label="AC Mod"
              value={acMod}
              onChange={(e: any) => setAcMod(e.target.value)}
              type="number"
              required
            />
            <Input
              variants={['small']}
              label="AC Override"
              value={acOverride}
              onChange={(e: any) => setAcOverride(e.target.value)}
              type="number"
              required
            />
            <Button variants={['save', 'bold', 'thin']} type="submit">Save</Button>
          </div>

          <div className="edit-armor-dialog__items">
            {/* <ListDisplay title="Armor" data={[]} placeholder="Add armor to inventory" />
            <ListDisplay title="Shields" data={[]} placeholder="Add shield to inventory" /> */}
          </div>
        </div>
      </form>
    </WindowDialog>
  );
}
