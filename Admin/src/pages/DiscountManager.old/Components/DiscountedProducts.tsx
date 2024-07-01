import { MdDeleteSweep } from "react-icons/md";
import { useEffect, useState } from "react";
import { useProducts } from "../../../context/ProductContext";
import { Product } from "../../../utils/types";

const DiscountedProducts = () => {
  const [products, setProducts] = useState<Product[]>();

  const adminRepo = useProducts();

  const fetchData = async () => {
    // const response = await adminRepo?.search({ discounted: true });
    // setProducts(response?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const revertDiscount = async (id: number) => {
    const newLamp: Partial<Product> = {
      percentOff: 0,
    };
    await adminRepo?.update(id, newLamp);
    await fetchData();
  };
  return (
    <div className="mx-auto container px-20">
      <table className="table-auto border-collapse w-full text-start ">
        <thead className="bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-md">
          <tr className="text-start">
            <th className="text-start">Id</th>
            <th className="text-start">Nume</th>
            <th className="text-start">Pret Vechi</th>
            <th className="text-start">Reducere</th>
            <th className="text-start">Pret Nou</th>
            <th className="text-start">Categorie</th>
            <th className="text-start">Sursa Lumina</th>
            <th className="text-start">Material</th>
            <th className="text-start">Elimina din lista</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((prod) => {
            return (
              <tr>
                <td className="py-4">{prod.id}</td>
                <td>{prod.name}</td>
                <td>{prod.price} RON</td>
                <td>{prod.percentOff}%</td>
                <td>
                  {prod.price! - (prod.price! * Number(prod.percentOff)) / 100}{" "}
                  RON
                </td>
                <td>{prod.categoryId}</td>
                <td>{prod.lightSource}</td>
                <td>{prod.material}</td>
                <td>
                  <MdDeleteSweep
                    size={"40px"}
                    className="cursor-pointer"
                    onClick={() => revertDiscount(prod.id!)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DiscountedProducts;
