import { useEffect, useState } from "react";
import { useAuth } from "../../../Contexts/AuthContext";
import axios from "axios";
import { Order } from "../../../Utils/types";
import OrderDrawer from "../Components/OrderDrawer";

type Props = {
  customer: string | undefined;
};

const OrderManager = (props: Props) => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [open, isOpen] = useState(false);
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
  const handleOrderOpen = (orderId: number) => {
    const order = orders?.find((o) => o.id == orderId);
    if (order) {
      isOpen(true);
      setSelectedOrder(order);
    }
  };
  return (
    <>
      {open && (
        <OrderDrawer
          order={selectedOrder}
          isOpen={open}
          closeDrawer={() => isOpen(false)}
        />
      )}
      <div className="text-black bg-white  p-4 m-4 rounded-lg">
        <table className="table-fixed w-full">
          <thead>
            <tr className="text-start bg-[#F7F0E0]">
              <th className="text-start p-4">Comanda #</th>
              <th className="text-start p-4">Data</th>
              <th className="text-start p-4">Adresa Livrare</th>
              <th className="text-start p-4">Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => {
              return (
                <tr>
                  <td className="p-4">#{order.id}</td>
                  <td className="p-4">{order.placedAt}</td>
                  <td className="p-4">{order.shippingAddress}</td>
                  <td className="p-4">RON {order.total}</td>
                  <td
                    className="text-blue-400 cursor-pointer p-4"
                    onClick={() => handleOrderOpen(order.id)}
                  >
                    Vezi comanda
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* <div className="flex flex-col justify-start">
        {orders?.map((order) => {
          return (
            <div className="flex flex-col bg-[#f2f2f2] p-2 my-2 rounded-lg">
             
            </div>
          );
        })}
      </div> */}
      </div>
    </>
  );
};

export default OrderManager;
