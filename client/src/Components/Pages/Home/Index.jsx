import { Link } from "react-router-dom";

import Logo from "../../../assets/img/LogoPeQ.png";

function Home() {
  return (
    <>
      <main className="home_main">

        <Link to="/le_store">
          <figure>
            <img src={Logo} alt="Logo Ozes" />
            <figcaption><p>Entrer</p></figcaption>
          </figure>
        </Link>

      </main>
    </>
  );
}

export default Home;
