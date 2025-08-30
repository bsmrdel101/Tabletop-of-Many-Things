import WindowDialog from "@/components/library/dialogs/WindowDialog";
import Input from "@/components/library/Input";
import useAutoSave from "@/hooks/useAutoSave";
import { editCharacter } from "@/rulesets/dnd/services/charactersService";
import { roomAtom } from "@/scripts/atoms/state";
import { emitServerEvent } from "@/scripts/config/socket-io";
import { useAtom } from "jotai";
import { useState } from "react";

interface Props {
  open: boolean
  setOpen: (value: boolean) => void
  character: Character_Dnd
}


export default function EditArmorDialog({ open, setOpen, character }: Props) {
  const [room] = useAtom(roomAtom);
  const [form, setForm] = useState({
    acMod: character.acMod,
    acOverride: character.acOverride,
  });

  const handleSave = async () => {
    const { acMod, acOverride } = form;
    const ac = Number(acOverride) > 0 ? Number(acOverride) : 10 + Number(acMod);
    const char = { ...character, ac, acMod: Number(acMod), acOverride: Number(acOverride) };
    emitServerEvent('UPDATE_PLAYER', [char, room]);
    await editCharacter(char);
  };

  useAutoSave(form, handleSave);


  return (
    <WindowDialog
      open={open}
      setOpen={setOpen}
      title="Edit Armor Class"
      className="edit-armor-dialog"
      x={200}
      y={100}
    >
      <form>
        <div className="edit-armor-dialog__content">
          <div>
            <Input
              variants={['x-small', 'no-arrows']}
              label="AC Mod"
              value={form.acMod}
              onChange={(e: any) => setForm((f) => ({ ...f, acMod: e.target.value }))}
              type="number"
              required
              data-testid="ac-mod"
            />
            <Input
              variants={['x-small', 'no-arrows']}
              label="AC Override"
              value={form.acOverride}
              onChange={(e: any) => setForm((f) => ({ ...f, acOverride: e.target.value }))}
              type="number"
              required
              data-testid="ac-override"
            />
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
