import ListDisplay from "@/components/ListDisplay";
import { memo } from "react";

interface Props {
  resistances: string[]
}


function Resistances({ resistances }: Props) {
  const parsedResistances = resistances.map((s) => {
    return `${s.capitalize()}`;
  });


  return (
    <ListDisplay
      title="Resistances"
      rows={parsedResistances}
    />
  );
}

export default memo(Resistances);
