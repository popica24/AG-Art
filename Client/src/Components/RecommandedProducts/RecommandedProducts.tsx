import { useEffect, useState } from "react";
import ProductCard from "../Products/ProductCard";
import { ProductCardProps } from "../../Utils/types";
import { useRecommanded } from "../../Contexts/RecommandedContext";

const RecommandedProducts = () => {
  const [items, setItems] = useState<Array<ProductCardProps> | null>(null);
  const repo = useRecommanded();
  useEffect(() => {
    fetchItems();
  }, []);
  const fetchItems = async () => {
    const result = await repo?.getMany();

    if (result?.data) setItems(result?.data);
  };
  if (!items || items.length == 0) return <></>;
  return (
    <div className="p-8 container mx-auto font-thin">
      <span className="text-[20px] md:text-[30px] lg:text-[50px] mb-[70px] sm:mb-[100px] lg:mb-[150px]">
        Alti utilizatori au vizualizat si
      </span>
      <div className="flex flex-col sm:flex-row items-center sm:items-stretch sm:flex-wrap justify-center sm:justify-between">
        {items.map((item) => (
          <div key={item.id} className="my-2">
            <ProductCard
              id={item.id}
              name={item.name}
              price={Number(item.price)}
              percentOff={item.percentOff}
              colors={item.colorCodes}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommandedProducts;
