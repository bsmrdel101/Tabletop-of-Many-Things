let selectedMenu: string;

export const toggleMenu = (menu: string) => {
  if (selectedMenu === menu) {
    document.getElementById(`${menu}-menu`)?.classList.add('hidden');
    selectedMenu = '';
  } else {
    document.getElementById(`${selectedMenu}-menu`)?.classList.add('hidden');
    document.getElementById(`${menu}-menu`)?.classList.remove('hidden');
    selectedMenu = menu;
  }
};
