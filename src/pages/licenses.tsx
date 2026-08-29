import Layout from "@/components/Layout";


export default function Licenses() {
  return (
    <Layout>
      <div className="licenses-page">
        <div className="licenses">
          <h2>Licenses</h2>

          <div className="license">
            <p className="license__title"><strong>D&D SRD 5.2</strong></p>
            <p>
              This work includes material taken from the System Reference Document 5.1 (“SRD 5.1”) by Wizards of<br />
              the Coast LLC and available at <a href="https://dnd.wizards.com/resources/systems-reference-document">https://dnd.wizards.com/resources/systems-reference-document</a>. The<br />
              SRD 5.1 is licensed under the Creative Commons Attribution 4.0 International License available at<br />
              <a href="https://creativecommons.org/licenses/by/4.0/legalcode">https://creativecommons.org/licenses/by/4.0/legalcode</a>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
