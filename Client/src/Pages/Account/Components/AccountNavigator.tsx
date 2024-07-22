import { GoPackageDependencies } from "react-icons/go";
import {
  MdContactSupport,
  MdOutlineAccountCircle,
  MdOutlineLocalShipping,
} from "react-icons/md";

type Props = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
};

const AccountNavigator = (props: Props) => {
  const handleSetPage = (page: number) => {
    props.setPage(page);
  };
  return (
    <div className="grid grid-cols-4 text-black mb-6">
      <div
        className={`col-span-1 border-white ${
          props.page == 1 ? "text-white bg-black" : "bg-white text-black"
        } text-center border  border-black cursor-pointer`}
        onClick={() => handleSetPage(1)}
      >
        <div className="inline-flex items-center text-xl py-2">
          <MdOutlineAccountCircle />
          <span className="hidden lg:block ms-1">Contul meu</span>
        </div>
      </div>
      <div
        className={`col-span-1 border-white ${
          props.page == 2 ? "text-white bg-black" : "bg-white text-black"
        } text-center border  border-black cursor-pointer`}
        onClick={() => handleSetPage(2)}
      >
        <div className="inline-flex items-center text-xl py-2">
          <MdOutlineLocalShipping />
          <span className="hidden lg:block ms-1">Detalii livrare</span>
        </div>
      </div>
      <div
        className={`col-span-1 border-white ${
          props.page == 3 ? "text-white bg-black" : "bg-white text-black"
        } text-center border  border-black cursor-pointer`}
        onClick={() => handleSetPage(3)}
      >
        <div className="inline-flex items-center text-xl py-2">
          <GoPackageDependencies />
          <span className="hidden lg:block ms-1">Comenzile mele</span>
        </div>
      </div>
      <div
        className={`col-span-1 border-white ${
          props.page == 4 ? "text-white bg-black" : "bg-white text-black"
        } text-center border  border-black cursor-pointer`}
        onClick={() => handleSetPage(4)}
      >
        <div className="inline-flex items-center text-xl py-2">
          <MdContactSupport />
          <span className="hidden lg:block ms-1">Contact</span>
        </div>
      </div>
    </div>
  );
};

export default AccountNavigator;
