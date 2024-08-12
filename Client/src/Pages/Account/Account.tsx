import { useEffect, useState } from "react";
import { UserData } from "../../Utils/types";
import { useAuth } from "../../Contexts/AuthContext";
import axios from "axios";
import AccountCard from "./Components/AccountCard";
import AccountSettings from "./Pages/AccountSettings";
import AccountNavigator from "./Components/AccountNavigator";
import ShippingSettings from "./Pages/ShippingSettings";
import OrderManager from "./Pages/OrderManager";
import ContactManager from "./Pages/ContactManager";

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
    document.title = `Iluminis | Contul meu`;
  }, []);
  return (
    <div className="text-white bg-black mt-[115.71px] md:mt-[110px] z-10">
      <div className="flex justify-start container mx-auto px-8">
        <span className="text-xl md:text-3xl md:text-start text-center w-full font-thin uppercase py-5">
          Contul meu
        </span>
      </div>
      <div className="container mx-auto px-8">
        <AccountNavigator setPage={setPage} page={page} />
      </div>
      <div className="flex flex-col lg:grid grid-cols-4 container mx-auto px-8 gap-x-6">
        <div className="col-span-1 mb-8 lg:mb-0">
          <AccountCard
            firstName={userData?.firstName}
            lastName={userData?.lastName}
            email={currentUser?.email}
          />
        </div>
        <div className="col-span-3">
          {page == 1 && (
            <AccountSettings userData={userData} currentUser={currentUser} />
          )}
          {page == 2 && <ShippingSettings userData={userData} />}
          {page == 3 && <OrderManager customer={userData?.customer} />}
          {page == 4 && (
            <ContactManager userData={userData} currentUser={currentUser} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
