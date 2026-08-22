import { ReactNode } from "react";
import Errors from "./library/Errors";
import Navbar from "./navbar/Navbar";
import Footer from "./Footer";

interface Props {
  children: ReactNode
}


export default function Layout({ children }: Props) {
  return (
    <>
      <Errors />
      <Navbar />
      { children }
      <Footer />
    </>
  );
}
