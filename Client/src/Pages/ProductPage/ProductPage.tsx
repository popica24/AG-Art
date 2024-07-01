import { useParams } from "react-router-dom";
import { removeHyphens } from "../../Utils/RemoveHyphens";
import ProductCard from "../../Components/Products/ProductCard";
import { useQuery } from "react-query";
import "react-loading-skeleton/dist/skeleton.css";
import { useSearch } from "../../Contexts/SearchContext";
import { ProductCardProps, ProductQueryParameters } from "../../Utils/types";
import { ApiResponse } from "../../Services/BaseRepository";
const ProductPage = () => {
  const { "*": value } = useParams();

  const search = useSearch();
  const headline = removeHyphens(value);
  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`search-products-${value}`],
    queryFn: () => {
      if (value && search) {
        const searchParams: ProductQueryParameters = {
          categoryId: value,
        };
        return search.create(searchParams) as ApiResponse<ProductCardProps[]>;
      }
    },
  });

  if (error) {
    return (
      <div className="text-white bg-black mt-[115.71px] md:mt-[110px] z-10">
        <div className="flex justify-start container mx-auto px-8">
          <span className="text-xl md:text-3xl md:text-start text-center w-full font-thin uppercase py-5">
            {headline}
          </span>
        </div>

        <div className="container mx-auto py-8">
          <div className="h-screen flex items-center justify-center">
            <span className="h-screen flex items-center justify-center flex-col">
              <img src="error.gif" width={80} className="h-auto" />
              <span className="text-2xl md:text-4xl font-thin mt-4">
                A aparut o eroare
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-white bg-black mt-[115.71px] md:mt-[110px] z-10">
        <div className="flex justify-start container mx-auto px-8">
          <span className="text-xl md:text-3xl md:text-start text-center w-full font-thin uppercase py-5">
            {headline}
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
  }

  if (response?.data) {
    return (
      <div className="text-white bg-black mt-[115.71px] md:mt-[110px] z-10">
        <div className="flex justify-start container mx-auto px-8">
          <span className="text-xl md:text-3xl md:text-start text-center w-full font-thin uppercase py-5">
            {headline}
          </span>
        </div>

        {response.data && response.data.length > 0 ? (
          <div className="container mx-auto py-8">
            <div className="grid-container place-content-center">
              {response.data?.map((item) => (
                <div className="grid-item w-min mx-auto" key={item.id}>
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
  }
};

export default ProductPage;
