import { Link } from "react-router-dom";
import "../nav.scss";
import Search from "./Search";
type Props = {
  searchOpen: boolean;
  setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const NavLinks = (props: Props) => {
  const closeSearch = () => {
    console.log("close");

    props.setSearchOpen(false);
  };
  return (
    <nav className="hidden lg:block text-xs md:text-md lg:text-base ">
      <div className="nav-container text-center ">
        <section className="text-base relative">
          {props.searchOpen && <Search closeSearch={closeSearch} />}
          <a id="top1" href="#one">
            Corpuri de iluminat
          </a>
          <a id="top2" href="#two">
            Accesorii
          </a>
          <a id="top3" href="#three">
            Decoratiuni interioare
          </a>
        </section>
        <section className="text-center">
          <a id="one" href="#top1">
            ←
          </a>
          <Link to="/pendule" className="whitespace-nowrap">
            Pendule
          </Link>
          <Link to="/lampadare-de-podea" className="whitespace-nowrap">
            Lampadare de podea
          </Link>
          <Link to="/lampi-de-masa" className="whitespace-nowrap">
            Lampi de masa
          </Link>
          <Link to="/abajururi-din-lemn" className="whitespace-nowrap">
            Abajururi din lemn
          </Link>
          <Link to="/aplice-de-perete" className="whitespace-nowrap">
            Aplice de perete
          </Link>
        </section>
        <section className="text-center">
          <a id="oneA" href="#one">
            ←
          </a>
          <a href="#oneA">Pendule</a>
          <a href="#">Lampadare de podea </a>
          <a href="#">Lampi de masa</a>
          <a href="#">Abajururi din lemn</a>
          <a href="#">Aplice de perete </a>
        </section>
        <section className="text-center">
          <a id="two" href="#top2">
            ←
          </a>
          <Link to="/becuri">Becuri</Link>
        </section>
        <section className="text-center">
          <a id="three" href="#top3">
            ←
          </a>
          <Link to="/tablouri-din-lemn">Tablouri din lemn</Link>
          <Link to="/articole-sezoniere">Articole sezoniere</Link>
        </section>
      </div>
    </nav>
  );
};

export default NavLinks;
