import { Link } from "react-router-dom";

const Editor = () => {
  return (
    <section>
      <h1>Editors Page</h1>
      <br />
      <p>You are editor.</p>
      <div className="flexGrow">
        <Link to="/home">Home</Link>
      </div>
    </section>
  );
}

export default Editor;