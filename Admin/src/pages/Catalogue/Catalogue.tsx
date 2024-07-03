import { useEffect, useState } from "react";

import AddProduct from "./Components/AddProduct";
import { useProducts } from "../../context/ProductContext";
import { Product } from "../../utils/types";
import CatalogueCard from "./Components/Card/CatalogueCard";

const Catalogue = () => {
  const products = useProducts();
  const [edit, setEdit] = useState(false);
  const [catalogue, setCatalogue] = useState<Array<Partial<Product>>>();

  useEffect(() => {
    fetchCatalogue();
  }, []);

  const fetchCatalogue = async () => {
    const response = await products?.getAll();

    setCatalogue(response?.data);
  };

  if (!catalogue) {
    return <></>;
  }

  return (
    <>
      {" "}
      <div className="flex flex-col items-center bg-black text-white h-full min-h-screen">
        <div className="flex flex-col md:flex-row justify-between items-center w-full container mx-auto">
          <h1
            className="text-4xl font-thin my-10 flex-grow text-center"
            data-aos="zoom-out"
          >
            Catalog produse
          </h1>
          <button
            className="bg-transparent hover:bg-gray-500 text-white font-semibold hover:text-white py-2 px-4 border border-whitehover:border-transparent rounded"
            onClick={() => setEdit(true)}
          >
            Add product
          </button>
        </div>

        <div className="flex flex-row flex-wrap items-stretch justify-start mx-auto relative">
          {catalogue.map((t) => {
            return (
              <CatalogueCard
                {...(t as Product)}
                key={t.id}
              />
            );
          })}
        </div>
      </div>
      {edit && <AddProduct handleClose={() => setEdit(false)} />}
    </>
  );
};

export default Catalogue;
