import { Link } from "react-router-dom";
import Button from "../components/Library/Button";

export default function LoginPage() {
  return (
    <div className="characters-page">
      <h1>Tabletop of <br /> Many Things</h1>

      <div className="characters-page__links-list">
        <Link to="/">Back</Link>
        <Button>New Character</Button>
      </div>
      <div className="characters-page__content">

      </div>
    </div>
  );
}
