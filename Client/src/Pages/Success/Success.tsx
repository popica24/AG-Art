import axios from "axios";
import { useEffect, useState } from "react";
import RecommandedProducts from "../../Components/RecommandedProducts/RecommandedProducts";
const API_URL = import.meta.env.VITE_API_URL;
const Success = () => {
  const queryParam = new URLSearchParams(window.location.search);
  const sessionId = queryParam.get("session_id");
  const [isError, setIsError] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSession();
  }, []);
  const fetchSession = () => {
    axios
      .get(`${API_URL}/checkoutsession/` + sessionId)
      .then((data) => handleSuccess(data.data))
      .catch(handleError);
  };
  const handleSuccess = (data: any) => {
    localStorage.removeItem("shopping-cart");
    setOrder(data);
    setIsError(false);
    setIsLoading(false);
    document.title = "AG Art | Success";
  };
  const handleError = () => {
    setIsError(true);
    setIsLoading(false);
    document.title = "AG Art | Failed";
  };
  if (isLoading)
    return (
      <div className="text-white bg-black mt-[115.71px] md:mt-[110px] z-10">
        <div className="flex justify-start container mx-auto px-8">
          <span className="text-xl md:text-3xl text-center w-full font-thin uppercase py-5">
            Procesare comanda
          </span>
        </div>

        <div className="container mx-auto py-8">
          <span className="h-screen flex items-center justify-center flex-col">
            <img src="loading.gif" width={80} className="h-auto" />
            <span className="text-2xl md:text-4xl font-thin mt-4">
              Se incarca
            </span>
          </span>
        </div>
      </div>
    );
  if (isError)
    return (
      <div className="text-white bg-black mt-[115.71px] md:mt-[110px] z-10">
        <div className="flex justify-center items-center flex-col container mx-auto px-8 min-h-[80vh]">
          <span className="text-xl md:text-3xl text-center w-full font-thin uppercase py-5">
            Link expirat sau invalid
          </span>
          <img src="error.gif" width={80} className="h-auto" />
        </div>
      </div>
    );

  return (
    <div className="text-white bg-black mt-[115.71px] md:mt-[110px] z-10">
      <div className="flex justify-start container mx-auto px-8">
        <span className="text-xl md:text-3xl text-center w-full font-thin uppercase py-5">
          Detalii comanda
        </span>
      </div>

      <div className="container mx-auto px-8">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-400">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nume Produs
                </th>
                <th scope="col" className="px-6 py-3">
                  Cantitate
                </th>
                <th scope="col" className="px-6 py-3">
                  Pret
                </th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((o: any) => {
                return (
                  <tr className="border-b bg-gray-800 border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-white whitespace-nowrap"
                    >
                      {o.name}
                    </th>
                    <td className="px-6 py-4">x{o.quantity}</td>
                    <td className="px-6 py-4">{o.price} RON</td>
                  </tr>
                );
              })}
              <tr className="border-b bg-gray-800 border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-white whitespace-nowrap"
                ></th>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4">{order.total} RON</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <RecommandedProducts />
    </div>
  );
};

export default Success;
