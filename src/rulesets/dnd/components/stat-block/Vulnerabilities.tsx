import ListDisplay from "@/components/ListDisplay";
import { memo } from "react";

interface Props {
  vulnerabilities: string[]
}


function Vulnerabilities({ vulnerabilities }: Props) {
  const parsedVulnerabilities = vulnerabilities.map((s) => {
    return `${s.capitalize()}`;
  });


  return (
    <ListDisplay
      title="Vulnerabilities"
      rows={parsedVulnerabilities}
    />
  );
}

export default memo(Vulnerabilities);
