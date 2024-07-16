import { useEffect, useState } from "react";
import { ProductCardProps } from "../../../Utils/types";
import ProductCard from "../../../Components/Products/ProductCard";
import { useLatest } from "../../../Contexts/LatestContext";

const ProductShowcase = () => {
  const [items, setItems] = useState<Array<ProductCardProps> | null>(null);
  const repo = useLatest();
  useEffect(() => {
    fetchItems();
  }, []);
  const fetchItems = async () => {
    const result = await repo?.getAll();

    if (result?.data) setItems(result?.data);
  };
  if (!items || items.length == 0) return <></>;
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-start">
        <span className="text-xl md:text-3xl md:text-start text-center w-full font-thin uppercase py-5">
          Produse noi
        </span>
      </div>
      <div className="grid-container place-content-center">
        {items.map((item) => (
          <div className="grid-item w-min mx-auto" key={item.id}>
            <ProductCard
              percentOff={item.percentOff}
              id={item.id}
              name={item.name}
              price={item.price}
              colors={item.colorCodes}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductShowcase;
