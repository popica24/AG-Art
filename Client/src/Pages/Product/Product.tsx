import { useParams } from "react-router-dom";
import ProductHero from "./Components/ProductHero";
import TechnicalSpecs from "./Components/TechnicalSpecs";
import { useQuery } from "react-query";
import RecommandedProducts from "../../Components/RecommandedProducts/RecommandedProducts";
import { useProducts } from "../../Contexts/ProductContext";
import { useEffect } from "react";

const Product = () => {
  const { productId } = useParams();

  const productRepository = useProducts();

  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`get-product-${productId}`],
    queryFn: () => {
      return productRepository?.get(Number(productId));
    },
  });
  useEffect(() => {
    if (response?.data?.name)
      document.title = `Iluminis | ${response?.data?.name}`;
    else {
      document.title = "Iluminis | Loading...";
    }
  }, [response?.data?.name]);
  if (
    isLoading ||
    error ||
    response == undefined ||
    response.data == undefined ||
    response.data.id == undefined ||
    response.data.price == undefined
  ) {
    return <></>;
  }
  return (
    <div className="text-white bg-black mt-[115.71px] md:mt-[105px] xl:mt-[115.71px] relative">
      <div className="flex flex-col justify-start">
        <ProductHero
          id={response.data.id}
          price={response.data.price}
          name={response.data.name}
          variants={response.data.variants}
          percentOff={response.data.percentOff ?? 0}
        />
        <span className="container mx-auto px-8 font-light text-xl">
          {response.data.description}
        </span>
        <TechnicalSpecs
          category={response.data.categoryId}
          dimensions={response.data.dimensions}
          lightSource={response.data.lightSource}
          material={response.data.material}
        />
        <RecommandedProducts />
      </div>
    </div>
  );
};

export default Product;
