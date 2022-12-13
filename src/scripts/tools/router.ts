import { createBrowserHistory } from "history";

const history = createBrowserHistory();


export const changeRoute = (route: string) => {
  history.push(`/#${route}`);
  setTimeout(() => window.location.reload(), 200);
};
