import { useEffect } from "react";
import { useAuth } from "../../../Contexts/AuthContext";
import axios from "axios";

type Props = {
  customer: string | undefined;
};

const OrderManager = (props: Props) => {
  const { currentUser } = useAuth();
  const fetchUser = () => {
    currentUser?.getIdToken().then((token) => {
      axios
        .get(import.meta.env.VITE_API_URL + "/orders", {
          params: {
            customer: props.customer,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => console.log(response.data));
    });
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return <div className="text-white">OrderManager</div>;
};

export default OrderManager;
