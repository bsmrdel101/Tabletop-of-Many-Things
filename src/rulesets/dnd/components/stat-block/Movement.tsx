import ListDisplay from "@/components/ListDisplay";
import { memo } from "react";

interface Props {
  speeds: Speed_Dnd[]
}


function Movement({ speeds }: Props) {
  const parsedSpeeds = speeds.map((s) => {
    return `${s.name.capitalize()} ${s.value} ft${s.hover ? ' <em>(hover)</em>' : ''}`;
  });


  return (
    <ListDisplay
      title="Movement"
      rows={parsedSpeeds}
    />
  );
}

export default memo(Movement);
