import CharacterSheetDnd from "@/rulesets/dnd/components/character-sheet/structure/CharacterSheetDnd";
import { roomAtom } from "@/scripts/atoms/state";
import { emitServerEvent } from "@/scripts/config/socket-io";
import { generateCode } from "@/scripts/tools/utils";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useSearchParams } from "react-router";


export default function CharacterPage() {
  const [params] = useSearchParams();
  const [, setRoom] = useAtom(roomAtom);
  const ruleset = params.get('ruleset');

  // TODO: Replace auto-join with a modal to join a game or continue.
  // If they choose continue, just create a random room for them to join.
  useEffect(() => {
    const room = generateCode(6);
    emitServerEvent('JOIN_ROOM', [room]);
    setRoom(room);
  }, []);


  return (
    <>
      { ruleset === '5e' && <CharacterSheetDnd /> }
    </>
  );
}
