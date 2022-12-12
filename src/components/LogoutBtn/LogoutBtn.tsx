import React from "react";
import { logout } from "../../controllers/userController";
import { changeRoute } from "../scripts/router";

export default function LogoutBtn() {
  const handleLogout = async () => {
    await logout();
    changeRoute('/login');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}
