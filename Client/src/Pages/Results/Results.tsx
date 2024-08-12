import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../Components/Products/ProductCard";
import { ProductCardProps, ProductQueryParameters } from "../../Utils/types";
import { useSearch } from "../../Contexts/SearchContext";

const Results = () => {
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const keywordsQuery = searchParams.get("keywords");
  const [products, setProducts] = useState<Array<ProductCardProps>>();
  const search = useSearch();
  useEffect(() => {
    document.title = "Iluminis | Catalogue";
  }, []);
  const fetchProducts = async () => {
    setLoading(true);
    try {
      if (!keywordsQuery) return;
      const keywords: ProductQueryParameters = {
        Keywords: keywordsQuery,
      };
      const response = await search?.create(keywords);

      setProducts(response?.data as ProductCardProps[]);
      setNotFound(false);
    } catch (err: any) {
      if (
        err.response.data.detail === "No results matched the search parameters."
      ) {
        setNotFound(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [keywordsQuery]);

  if (loading) {
    <span className="h-screen flex items-center justify-center flex-col text-white">
      <img src="loading.gif" width={80} className="h-auto" />
      <span className="text-2xl md:text-4xl font-thin mt-4">Cauta...</span>
    </span>;
  }

  if (notFound && !loading) {
    return (
      <span className="h-screen flex items-center justify-center flex-col text-white">
        <img src="loading.gif" width={80} className="h-auto" />
        <span className="text-2xl md:text-4xl font-thin mt-4">
          Nu s-a gasit nimic pentru cererea dvs
        </span>
      </span>
    );
  }

  return (
    <div className="text-white bg-black mt-[115.71px] md:mt-[110px] z-10">
      <div className="flex justify-start container mx-auto px-8">
        <span className="text-xl md:text-3xl md:text-start text-center w-full font-thin uppercase py-5">
          Filter
        </span>
      </div>
      {products && products.length > 0 ? (
        <div className="container mx-auto py-8">
          <div className="grid-container place-content-center">
            {products.map((item) => (
              <div className="grid-item w-min mx-auto" key={item.id}>
                <ProductCard
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  colors={item.colorCodes}
                  percentOff={item.percentOff}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <span className="h-screen flex items-center justify-center flex-col">
          <img src="loading.gif" width={80} className="h-auto" />
          <span className="text-2xl md:text-4xl font-thin mt-4">
            Nu exista continut pentru aceasta categorie
          </span>
        </span>
      )}
    </div>
  );
};

export default Results;
