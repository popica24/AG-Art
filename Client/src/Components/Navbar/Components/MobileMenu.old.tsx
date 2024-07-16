import MobileSearch from "./MobileSearch.old";
import { useCart } from "../../../Contexts/ShoppingCartContext";
import { VscAccount } from "react-icons/vsc";
import { useAuth } from "../../../Contexts/AuthContext";
import { IoIosLogIn } from "react-icons/io";

type Props = {
  openAuth: () => void;
};

const MobileMenu = (props: Props) => {
  const { openCart, cartQuantity } = useCart();
  const { currentUser } = useAuth();
  return (
    <label
      className="relative z-[9999] cursor-pointer px-3 py-6 mt-2 lg:hidden block"
      htmlFor="mobile-menu"
    >
      <input className="peer hidden" type="checkbox" id="mobile-menu" />
      <div className="relative z-[9999] block h-[1px] w-7 bg-white bg-transparent content-[''] before:absolute before:top-[-0.35rem] before:z-[9999] before:block before:h-full before:w-full before:bg-[#F7EDE3] before:transition-all before:duration-200 before:ease-out before:content-[''] after:absolute after:right-0 after:bottom-[-0.35rem] after:block after:h-full after:w-full after:bg-[#F7EDE3] after:transition-all after:duration-200 after:ease-out after:content-[''] peer-checked:bg-transparent before:peer-checked:top-0 before:peer-checked:w-full before:peer-checked:rotate-45 before:peer-checked:transform after:peer-checked:bottom-0 after:peer-checked:w-full after:peer-checked:-rotate-45 after:peer-checked:transform"></div>
      <div className="fixed inset-0 z-[9999] hidden h-full w-full bg-[#F7EDE3]/50 backdrop-blur-sm peer-checked:block">
        &nbsp;
      </div>
      <div className="fixed top-0 right-0 z-[9999] h-full w-full translate-x-full overflow-y-auto overscroll-y-none transition duration-500 peer-checked:translate-x-0">
        <div className="float-right min-h-full w-[85%] bg-black px-6 pt-12 shadow-2xl font-thin flex flex-col">
          <MobileSearch />
          <span className="text-xl">Corpuri de iluminat</span>
          <ul className="ms-6 my-3 underline underline-offset-4 leading-7">
            <li>
              <a href={"/pendule"}>Pendule</a>
            </li>
            <li>
              <a href={"/lampadare-de-podea"}>Lampadare de podea</a>
            </li>
            <li>
              <a href={"/lampi-de-masa"}>Lampi de masa</a>
            </li>
            <li>
              <a href={"/abajururi-din-lemn"}>Abajururi din lemn</a>
            </li>
            <li>
              <a href={"/aplice-de-perete"}>Pendule</a>
            </li>
          </ul>
          <span className="text-xl">Accesorii</span>
          <ul className="ms-6 my-3 underline underline-offset-4 leading-7">
            <li>
              <a href={"/becuri"}>Becuri</a>
            </li>
          </ul>
          <span className="text-xl">Decoratiuni interioare</span>
          <ul className="ms-6 my-3 underline underline-offset-4 leading-7">
            <li>
              <a href={"/tablouri-din-lemn"}>Tablouri din lemn</a>
            </li>
            <li>
              <a href={"/articole-sezoniere"}>Articole sezoniere</a>
            </li>
          </ul>
          <hr />
          <div className="flex flex-row items-center justify-center my-4">
            {currentUser ? (
              <a href={"/account"}>
                <VscAccount size={"40px"} />
              </a>
            ) : (
              <span onClick={props.openAuth} className="cursor-pointer">
                <IoIosLogIn size={"40px"} />
              </span>
            )}
            <button onClick={openCart} className="relative">
              <img
                className="mx-6"
                src="/shopping.svg"
                alt="Shopping Cart"
                width={40}
                height={40}
              />
              <span className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/3 text-lg">
                {cartQuantity}
              </span>
            </button>
          </div>
        </div>
      </div>
    </label>
  );
};

export default MobileMenu;
