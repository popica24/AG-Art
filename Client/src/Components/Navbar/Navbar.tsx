import { Link } from "react-router-dom";
import MobileMenu from "./Components/MobileMenu";
import NavLinks from "./Components/NavLinks";
import { useCart } from "../../Contexts/ShoppingCartContext";
import { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { useAuth } from "../../Contexts/AuthContext";
import { IoIosLogIn } from "react-icons/io";
import Authenticate from "../../Pages/Authenticate/Authenticate";

const Navbar = () => {
  const { openCart, cartQuantity } = useCart();
  const { currentUser } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);
  const openSearch = () => {
    setSearchOpen(!searchOpen);
  };
  return (
    <>
      <div className="bg-black text-[#F7EDE3] py-8 fixed left-0 right-0 top-0 z-50">
        <div className="flex flex-row items-center lg:justify-evenly justify-center max-w-[90vmin] md:container mx-auto ">
          <Link to={"/"}>
            <img
              src="/LOGO.jpg"
              alt="Logo"
              width={40}
              height={40}
              className="border border-black"
            />
          </Link>
          <NavLinks setSearchOpen={setSearchOpen} searchOpen={searchOpen} />

          <div className="flex flex-row-reverse items-center">
            {" "}
            <MobileMenu openAuth={() => setOpenAuth(true)} />
          </div>

          <div className="lg:flex flex-row items-center hidden">
            <button onClick={openSearch}>
              <img src="/search.svg" alt="Search" width={20} height={20} />
            </button>

            <button onClick={openCart} className="relative">
              <img
                className="mx-6"
                src="/shopping.svg"
                alt="Shopping Cart"
                width={20}
                height={20}
              />
              <span className="absolute top-1/2 right-1/2 xl:translate-x-1/2 lg:translate-x-[60%] translate-x-[90%] -translate-y-1/3 text-xs">
                {cartQuantity}
              </span>
            </button>
            {currentUser ? (
              <Link to={"/account"}>
                <VscAccount size={"20px"} />
              </Link>
            ) : (
              <span
                onClick={() => setOpenAuth(true)}
                className="cursor-pointer"
              >
                <IoIosLogIn size={"24px"} />
              </span>
            )}
          </div>
        </div>
      </div>
      {openAuth && <Authenticate close={() => setOpenAuth(false)} />}
    </>
  );
};

export default Navbar;
