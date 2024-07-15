import { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import axios from "axios";
import AccountSettings from "./Pages/AccountSettings";
import OrderManager from "./Pages/OrderManager";
import { UserData } from "../../Utils/types";

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

  return (
    <div className="text-white bg-black mt-[115.71px] md:mt-[110px] z-10">
      <div className="flex justify-start container mx-auto px-8">
        <span className="text-xl md:text-3xl md:text-start text-center w-full font-thin uppercase py-5">
          Șlefuim lumina în artă.
        </span>
      </div>
      <div className="container p-20 mx-auto">
        <div className="grid grid-cols-4">
          <div className="col-span-1">
            <div className="flex flex-col">
              <span
                onClick={() => setPage(1)}
                className={`p-2 bg-white mt-4 ${
                  page == 1 ? "text-red-600" : "text-black cursor-pointer"
                }`}
              >
                Comenzi
              </span>
              <span
                onClick={() => setPage(2)}
                className={`p-2 bg-white mt-4 ${
                  page == 2 ? "text-red-600" : "text-black cursor-pointer"
                }`}
              >
                Setari cont
              </span>
            </div>
          </div>
          <div className="col-span-3">
            {page == 1 && <OrderManager customer={userData?.customer} />}

            {page == 2 && <AccountSettings userData={userData} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
