export const changeRoute = (route: string) => {
  console.log(window.location, route);
  window.location.replace(route);
};
