import { useEffect, useState } from "react";
import ClientRepository from "../../services/ClientRepository";
import { UserContactProps } from "../../utils/types";

const Clients = () => {
  const clientRepo = new ClientRepository();
  const [customers, setCustomers] = useState<Array<UserContactProps>>();
  useEffect(() => {
    fetchCustomers();
  }, []);
  const fetchCustomers = async () => {
    const users = await clientRepo.getMany();
    setCustomers(users.data);
  };

  return (
    <div className="flex flex-col items-center bg-black text-white h-full min-h-screen">
      <h1 className="text-4xl font-thin my-8" data-aos="zoom-out">
        Clienti
      </h1>
      <div className="mx-auto container px-20">
        <table className="table-auto border-collapse w-full text-start ">
          <thead className="bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-md">
            <tr className="text-start">
              <th className="text-start">Nume</th>
              <th className="text-start">Email</th>
              <th className="text-start">Telefon</th>
              <th className="text-start">Adresa de Acasa</th>
              <th className="text-start">Adresa Livrarii</th>
            </tr>
          </thead>
          <tbody>
            {customers && customers.length > 0 ? (
              customers.map((cust) => {
                return (
                  <tr>
                    <td className="py-4">{cust.name}</td>
                    <td>{cust.email}</td>
                    <td>{cust.phone}</td>
                    <td>
                      {cust.addressLine2
                        ? cust.addressCity +
                          " - " +
                          cust.addressLine1 +
                          " / " +
                          cust.addressLine2 +
                          " - " +
                          cust.addressPostalCode
                        : cust.addressCity +
                          " - " +
                          cust.addressLine1 +
                          " - " +
                          cust.addressPostalCode}
                    </td>
                    <td>
                      {cust.shippingLine2
                        ? cust.shippingCity +
                          " - " +
                          cust.shippingLine1 +
                          " / " +
                          cust.shippingLine2 +
                          " - " +
                          cust.shippingPostalCode
                        : cust.shippingCity +
                          " - " +
                          cust.shippingLine1 +
                          " - " +
                          cust.shippingPostalCode}
                    </td>
                  </tr>
                );
              })
            ) : (
              <span>Nu exista clienti</span>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clients;
