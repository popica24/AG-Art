import { useState } from "react";
import { MdDeleteSweep } from "react-icons/md";
import { Product } from "../../../utils/types";
import { useProducts } from "../../../context/ProductContext";

const DiscountCreate = () => {
  const [category, setCategory] = useState("");
  const [material, setMaterial] = useState("");
  const [lightSource, setLightSource] = useState("");

  const [products, setProducts] = useState<Product[]>();

  const [discount, setDiscount] = useState(0);

  const productRepo = useProducts();

  const handleChange = (e: any) => {
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    setDiscount(newValue);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // const reponse = await productRepo?.search({
    //   category: category,
    //   lightSource: lightSource,
    //   material: material,
    //   discounted: false,
    // });
    // setProducts(reponse?.data);
  };

  const handleDiscountSubmit = async (e: any) => {
    e.preventDefault();
    const newLamp: Partial<Product> = {
      percentOff: Number(discount),
    };
    products?.map(async (prod) => {
      await productRepo?.update(prod.id!, newLamp);
    });

    // const reponse = await productRepo?.search({
    //   category: category,
    //   lightSource: lightSource,
    //   material: material,
    //   discounted: false,
    // });
    // setProducts(reponse?.data);
  };

  const handleDelete = (id: number) => {
    if (products) setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <>
      <div className="mx-auto container px-20">
        <div className="flex flex-col justify-center items-center">
          <span className="font-thin">
            Completeaza filtrele dupa preferinte, lasa filtrul gol daca nu
            doresti sa selectezi dupa campul respectiv
          </span>
          <form
            id="searchForm"
            className="flex flex-col justify-center w-full my-4 py-4"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-row items-center justify-evenly w-full">
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                type="text"
                className="text-black py-1 px-2 rounded-md"
                placeholder="Categorie"
              />
              <input
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                type="text"
                className="text-black py-1 px-2 rounded-md"
                placeholder="Material"
              />
              <input
                value={lightSource}
                onChange={(e) => setLightSource(e.target.value)}
                type="text"
                className="text-black py-1 px-2 rounded-md"
                placeholder="Sursa de lumina"
              />
            </div>
            <input
              type="submit"
              className="mt-4 cursor-pointer"
              value="Search"
            />
          </form>
        </div>
        {products && products.length > 0 && (
          <form onSubmit={handleDiscountSubmit} id="discountForm">
            <table className="table-auto border-collapse w-full text-start mx-auto container">
              <thead className="bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-md">
                <tr className="text-start">
                  <th className="text-start">Id</th>
                  <th className="text-start">Nume</th>
                  <th className="text-start">Pret</th>
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
                      <td>{prod.price}</td>
                      <td>{prod.categoryId}</td>
                      <td>{prod.lightSource}</td>
                      <td>{prod.material}</td>
                      <td>
                        <MdDeleteSweep
                          size={"40px"}
                          className="cursor-pointer"
                          onClick={() => handleDelete(prod.id!)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex flex-col items-center justify-center w-full">
              <input
                type="text"
                className="w-[180px] py-1 rounded-md text-black text-center"
                value={discount + "%"}
                onChange={handleChange}
              />
              <input
                type="submit"
                value="Submit Discount"
                className="cursor-pointer bg-white text-black px-8 py-2 m-4 rounded-md"
              />
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default DiscountCreate;
