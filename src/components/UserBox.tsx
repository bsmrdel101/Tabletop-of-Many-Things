import { userAtom } from "@/scripts/atoms/state";
import { useAtom } from "jotai";
import Button from "./Library/Button";
import { useState } from "react";
import { logout } from "@/services/userService";


export default function UserBox() {
  const [user] = useAtom<User>(userAtom);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    location.reload();
  };


  return (
    <div className="user-box">
      <h3>{ user.username }</h3>
      <Button variants={['empty']} onClick={() => setMenuOpen(!menuOpen)}>|||</Button>
      
      {menuOpen &&
        <div className="user-box__menu">
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      }
    </div>
  );
}
