import ListDisplay from "@/components/ListDisplay";
import { memo } from "react";

interface Props {
  languages: string[]
}


function Languages({ languages }: Props) {
  return (
    <ListDisplay
      title="Languages"
      rows={languages}
    />
  );
}

export default memo(Languages);
