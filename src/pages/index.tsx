import Layout from "@/components/Layout";
import Button from "@/components/library/Button";
import Link from "@/components/library/Link";


export default function Home() {
  return (
    <Layout>
      <main className="home">
        <h1>Tabletop of<br/>Many Things</h1>

        <Button style={{ margin: 'auto' }} variants={['link', 'dark', 'x-large']}>
          <Link to="/play">Play Now</Link>
        </Button>
      </main>
    </Layout>
  );
}
