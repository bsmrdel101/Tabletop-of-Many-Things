import ListDisplay from "@/components/ListDisplay";
import { memo } from "react";

interface Props {
  immunities: string[]
}


function Immunities({ immunities }: Props) {
  const parsedImmunities = immunities.map((s) => {
    return `${s.capitalize()}`;
  });


  return (
    <ListDisplay
      title="Immunities"
      rows={parsedImmunities}
    />
  );
}

export default memo(Immunities);
