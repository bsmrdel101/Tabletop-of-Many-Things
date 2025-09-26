import ListDisplay from "@/components/ListDisplay";
import { memo } from "react";

interface Props {
  senses: NameValue[]
}


function Senses({ senses }: Props) {
  const parsedSenses = senses.map((s) => {
    return `${s.name.capitalize()} ${s.value} ft`;
  });


  return (
    <ListDisplay
      title="Senses"
      rows={parsedSenses}
    />
  );
}

export default memo(Senses);
