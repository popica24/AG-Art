import { useQuery } from "react-query";
import { useTodo } from "../../context/ToDoContext";
import { useState } from "react";
import { Order } from "../../utils/types";
import OrderDrawer from "../../components/OrderDrawer";

const ToDo = () => {
  const toDoRepository = useTodo();
  const [selectedOrder, setSelectedOrder] = useState<Order>();
  const [open, setOpen] = useState(false);
  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`get-todos`],
    queryFn: () => {
      return toDoRepository?.getMany();
    },
  });
  if (
    isLoading ||
    error ||
    response == undefined ||
    response.data == undefined
  ) {
    return <>Loading...</>;
  }
  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);
    setOpen(true);
  };
  return (
    <>
      {open && (
        <OrderDrawer
          order={selectedOrder}
          isOpen={open}
          closeDrawer={() => setOpen(false)}
        />
      )}
      <div className="flex flex-col items-center bg-black text-white h-full min-h-screen">
        <h1 className="text-4xl font-thin my-8" data-aos="zoom-out">
          Comenzi de facut
        </h1>
        <div className="container mx-auto">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Data plasarii
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Metoda plata
                  </th>
                  <th scope="col" className="px-6 py-3" />
                </tr>
              </thead>
              <tbody>
                {response.data.map((t) => {
                  return (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {t.id}
                      </th>
                      <td className="px-6 py-4">{t.total}</td>
                      <td className="px-6 py-4">{t.placedAt}</td>
                      <td className="px-6 py-4">{t.paymentMethod}</td>
                      <td
                        className="px-6 py-4 text-blue-400 cursor-pointer hover:text-blue-600"
                        onClick={() => handleSelectOrder(t)}
                      >
                        Vezi Produse
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDo;
