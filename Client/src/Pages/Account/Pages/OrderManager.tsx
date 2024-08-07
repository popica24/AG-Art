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
      <div className="lg:p-16 p-8 bg-white rounded-xl text-black my-6 md:my-0">
        <div className="flex flex-col justify-start lg:justify-center items-start lg:items-center">
          <span className="text-2xl font-thin w-full lg:text-start">
            Comenzile Mele
          </span>
          <p className="text-xs lg:text-sm text-start w-full font-thin">
            Apăsați click pe o comandă pentru a vizualiza detaliile
          </p>
          <table className="table-auto w-full text-sm">
            <thead className="border-b border-b-gray-300">
              <tr className="text-start">
                <th className="text-start pt-4 whitespace-nowrap">Id</th>
                <th className="text-start pt-4">Data</th>
                <th className="text-start pt-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => {
                return (
                  <tr
                    className="border-b-gray-300 border-b cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => handleOrderOpen(order.id)}
                  >
                    <td className="py-4">#{order.id}</td>
                    <td className="py-4">{order.placedAt}</td>
                    <td className="py-4 whitespace-nowrap">
                      RON {order.total}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrderManager;
