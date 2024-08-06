import { BiSolidFoodMenu } from "react-icons/bi";
import { useAuth } from "../../../Contexts/AuthContext";
import { Link } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { IoIosLogIn } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import MobileSearch from "./MobileSearch";
import { AiOutlineShopping } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import MobileDrawer from "./MobileDrawer";
type Props = {
  openCart: () => void;
};
const MobileMenu = (props: Props) => {
  const { currentUser, openAuth } = useAuth();
  const [openSearch, setOpenSearch] = useState(false);
  const [openCatalogue, setOpenCatalogue] = useState(false);
  const closeSearch = () => setOpenSearch(false);
  const closeCatalogue = () => setOpenCatalogue(false);

  return (
    <>
      {openCatalogue && (
        <MobileDrawer isOpen={openCatalogue} closeCatalogue={closeCatalogue} />
      )}
      {openSearch && <MobileSearch closeSearch={closeSearch} />}
      <div className="z-40 fixed bottom-0 left-0 w-full p-4 bg-black/50 text-[#F7F0E0] text-sm block lg:hidden">
        <div className="flex flex-row items-center justify-evenly max-w-lg mx-auto">
          <Link to={"/"} className="flex flex-col items-center">
            <GoHome size={20} />
            <span>Acasa</span>
          </Link>
          <div
            className="flex flex-col items-center"
            onClick={() => setOpenSearch(true)}
          >
            <FiSearch size={20} />
            <span>Cauta</span>
          </div>
          <div
            className="flex flex-col items-center"
            onClick={() => setOpenCatalogue(true)}
          >
            <BiSolidFoodMenu size={20} />
            <span>Catalog</span>
          </div>
          <div className="flex flex-col items-center" onClick={props.openCart}>
            <AiOutlineShopping size={22} />
            <span>Cos</span>
          </div>
          <div>
            {currentUser ? (
              <Link to={"/account"} className="flex flex-col items-center">
                <VscAccount size={"22px"} />
                <span>Cont</span>
              </Link>
            ) : (
              <div onClick={openAuth} className="flex flex-col items-center">
                <IoIosLogIn size={"22px"} />
                <span>Login</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
