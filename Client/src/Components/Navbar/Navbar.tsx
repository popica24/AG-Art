import { Link } from "react-router-dom";
import MobileMenu from "./Components/MobileMenu";
import NavLinks from "./Components/NavLinks";
import { useCart } from "../../Contexts/ShoppingCartContext";
import { useState } from "react";

const Navbar = () => {
  const { openCart, cartQuantity } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const openSearch = () => {
    setSearchOpen(!searchOpen);
  };
  return (
    <div className="bg-black text-[#F7EDE3] py-8 fixed left-0 right-0 top-0 z-50">
      <div className="flex flex-row items-center md:justify-evenly justify-between max-w-[90vmin] md:container mx-auto ">
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
          <MobileMenu />
          <button onClick={openCart} className="relative md:hidden">
            <img
              className="mx-3"
              src="/shopping.svg"
              alt="Shopping Cart"
              width={25}
              height={25}
            />
            <span className="absolute top-1/2 right-1/2 xl:translate-x-1/2 translate-x-[50%] -translate-y-1/3 text-xs">
              {cartQuantity}
            </span>
          </button>
        </div>

        <div className="md:flex flex-row-items-center hidden lg:mb-4">
          <button onClick={openSearch}>
            <img
              className="mx-3"
              src="/search.svg"
              alt="Search"
              width={25}
              height={25}
            />
          </button>
          <button onClick={openCart} className="relative">
            <img
              className="mx-3"
              src="/shopping.svg"
              alt="Shopping Cart"
              width={25}
              height={25}
            />
            <span className="absolute top-1/2 right-1/2 xl:translate-x-1/2 lg:translate-x-[60%] translate-x-[90%] -translate-y-1/3 text-xs">
              {cartQuantity}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
