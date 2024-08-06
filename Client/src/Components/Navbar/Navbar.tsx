import { Link } from "react-router-dom";
import MobileMenu from "./Components/MobileMenu";
import NavLinks from "./Components/NavLinks";
import { useCart } from "../../Contexts/ShoppingCartContext";
import { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { useAuth } from "../../Contexts/AuthContext";
import { IoIosLogIn } from "react-icons/io";
import Swal from "sweetalert2";

const Navbar = () => {
  const { openCart, cartQuantity } = useCart();
  const { currentUser, openAuth } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = () => {
    setSearchOpen(!searchOpen);
  };
  const handleCartOpen = () => {
    if (currentUser && currentUser.uid) {
      openCart();
    } else {
      Swal.fire({
        title: "Trebuie sa ai un cont pentru a continua",
        text: "Pentru a avea acces la cosul de cumparaturi trebuie sa fii logat pe contul tau.",
        icon: "warning",
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          openAuth();
        }
      });
    }
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
            <MobileMenu openCart={handleCartOpen} />
          </div>

          <div className="lg:flex flex-row items-center hidden">
            <button onClick={openSearch}>
              <img src="/search.svg" alt="Search" width={20} height={20} />
            </button>

            <button onClick={handleCartOpen} className="relative">
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
              <span onClick={openAuth} className="cursor-pointer">
                <IoIosLogIn size={"24px"} />
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
