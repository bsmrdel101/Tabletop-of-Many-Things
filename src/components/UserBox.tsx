import { userAtom } from "@/scripts/atoms/state";
import { useAtom } from "jotai";
import Button from "./library/Button";
import { useRef, useState } from "react";
import { logout } from "@/services/userService";
import Img from "./library/Img";
import { useClickOutside } from "@/hooks/useClickOutside";


export default function UserBox() {
  const [user] = useAtom<User>(userAtom);
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  
  useClickOutside(ref, () => setMenuOpen(false));

  const handleLogout = async () => {
    await logout();
    location.reload();
  };


  return (
    <div className="user-box" ref={ref}>
      <Button variants={['empty']} onClick={() => setMenuOpen(!menuOpen)}>
        <Img alt="Profile pic" src={user.img ? user.img : '/images/defaults/profile_pic.png'} />
      </Button>
      
      {menuOpen &&
        <div className="user-box__menu">
          <h3>{ user.displayName }</h3>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      }
    </div>
  );
}
