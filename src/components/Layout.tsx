import { ReactNode } from "react";
import Errors from "./library/Errors";

interface Props {
  children: ReactNode
}


export default function Layout({ children }: Props) {
  return (
    <div>
      <Errors />

      { children }
    </div>
  );
}
