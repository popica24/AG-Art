import { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import axios from "axios";
import AccountSettings from "./Pages/AccountSettings";
import OrderManager from "./Pages/OrderManager";
import { UserData } from "../../Utils/types";
import { GoPackageDependencies } from "react-icons/go";
import { GrUserSettings } from "react-icons/gr";
import { RiLogoutBoxLine } from "react-icons/ri";
import { signOut } from "firebase/auth";
import { auth } from "../../Utils/firebase";

const Account = () => {
  const [page, setPage] = useState(1);
  const [userData, setUserData] = useState<UserData | null>(null);
  const { currentUser } = useAuth();
  const fetchUser = () => {
    currentUser?.getIdToken().then((token) => {
      axios
        .get(import.meta.env.VITE_API_URL + "/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setUserData(response.data));
    });
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="text-white bg-black mt-[115.71px] md:mt-[110px] z-10">
      <div className="flex justify-start container mx-auto px-8">
        <span className="text-xl md:text-3xl md:text-start text-center w-full font-thin uppercase py-5">
          Contul meu
        </span>
      </div>
      <div className="container p-20 mx-auto">
        <div className="grid grid-cols-4">
          <div className="col-span-1">
            <span className="text-2xl font-thin">
              Bun venit {userData?.firstName},
            </span>
            <div className="flex flex-col bg-white mt-4 p-4 rounded">
              <span
                onClick={() => setPage(1)}
                className={`p-2 text-black inline-flex items-center ${
                  page == 1 ? "bg-[#f2f2f2]" : " cursor-pointer "
                }`}
              >
                <GoPackageDependencies className="me-1" />
                Comenzi
              </span>
              <span
                onClick={() => setPage(2)}
                className={`p-2 mt-4 text-black inline-flex items-center ${
                  page == 2 ? "bg-[#f2f2f2]" : " cursor-pointer bg-white"
                }`}
              >
                <GrUserSettings className="me-1" />
                Setari cont
              </span>
              <span
                className="p-2 mt-4 inline-flex items-center cursor-pointer bg-white text-red-500"
                onClick={() => handleLogout()}
              >
                <RiLogoutBoxLine className="me-1" />
                Delogare
              </span>
            </div>
          </div>
          <div className="col-span-3 h-full">
            {page == 1 && <OrderManager customer={userData?.customer} />}

            {page == 2 && <AccountSettings userData={userData} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
