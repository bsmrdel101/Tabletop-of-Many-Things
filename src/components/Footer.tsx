import Link from "./library/Link";


export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Tabletop of Many Things</p>
      <Link to="/licenses">Credits & Licenses</Link>
    </footer>
  );
}
