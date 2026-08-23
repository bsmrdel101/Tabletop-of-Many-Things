import { ReactNode, useEffect } from "react";
import Errors from "./library/Errors";
import Navbar from "./navbar/Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/userService";

interface Props {
  children: ReactNode
}


export default function Layout({ children }: Props) {
  const navigate = useNavigate();

  const { data: user = -1 } = useQuery<User | null>({
    queryKey: ['user'],
    queryFn: getUser
  });

  useEffect(() => {
    if (user === -1) return;
    if (!user?.pubId && location.pathname !== '/') navigate('/login');
  }, [user]);


  return (
    <>
      <Errors />
      <Navbar />
      { children }
      <Footer />
    </>
  );
}
