import React from "react";
import { logout } from "../../controllers/userController";
import { changeRoute } from "../../scripts/tools/router";

export default function LogoutBtn() {
  const handleLogout = async () => {
    await logout();
    changeRoute('/login');
  };

  return (
    <button className="button btn--hover btn--logout" onClick={handleLogout}>Logout</button>
  );
}
