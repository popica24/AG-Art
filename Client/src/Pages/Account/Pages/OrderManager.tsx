import { useEffect, useState } from "react";
import { useAuth } from "../../../Contexts/AuthContext";
import axios from "axios";
import { Order } from "../../../Utils/types";

type Props = {
  customer: string | undefined;
};

const OrderManager = (props: Props) => {
  const [orders, setOrders] = useState<Order[] | null>(null);
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
        .then((response) => setOrders(response.data));
    });
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="text-black bg-white  p-4 m-4 rounded-lg">
      <div className="flex flex-col justify-start">
        {orders?.map((order) => {
          return (
            <div className="flex flex-col bg-[#f2f2f2] p-2 my-2 rounded-lg">
              <span>
                Order: <b>#{order.id}</b>
              </span>
              <b>{order.name}</b>
              <span>
                Qty: <b>{order.quantity}</b>
              </span>
              <span>
                Pret: <b>{order.price} RON</b>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderManager;
