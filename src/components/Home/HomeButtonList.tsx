import Button from "../Library/Button";


export default function HomeButtonList() {
  return (
    <div className="home__button-list">
      <Button>Play</Button>
      <Button variants={['secondary']}>Characters</Button>
    </div>
  );
}
