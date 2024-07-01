import KeywordHeader from "./Keyword/KeywordHeader";
import PriceRow from "./Price/PriceRow";
import VariantHeader from "./Variant/VariantHeader";
import VariantRow from "./Variant/VariantRow";
import KeywordRow from "./Keyword/KeywordRow";
import { Product } from "../../../../utils/types";
import EditableRow from "./EditableRow";
import { propertyOf } from "../../../../utils/NameOf";
import DescriptionRow from "./DescriptionRow";
import CategoryRow from "./CategoryRow";
import { IntToCategory } from "../../../../utils/IntToCategory";

const CatalogueCard = (product: Product) => {
  if (!product.id || !product.price) {
    return <></>;
  }
  return (
    <div className="m-4 max-w-[364px] aspect-[3/4] p-4 bg-clip-border rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-md">
      <div className="flex flex-col items-start">
        <span className="w-full text-center text-2xl">{product.name}</span>
        <span className="mt-2">Caracteristici</span>
        <span className="my-2 w-full border-t-[.2px] border-b-[.2px] border-[#9e9e9e69] px-6 py-2">
          <ul className="list-disc">
            <CategoryRow
              id={product.id}
              name={IntToCategory(product.categoryId)!}
              categoryId={product.categoryId}
            />
            <EditableRow
              id={product.id}
              field="Material"
              propName={propertyOf<Product>("material")}
              name={product.material}
            />
            <EditableRow
              id={product.id}
              field="Dimensiuni"
              propName={propertyOf<Product>("dimensions")}
              name={product.dimensions}
            />
            <EditableRow
              id={product.id}
              field="Sursa de Lumina"
              propName={propertyOf<Product>("lightSource")}
              name={product.lightSource}
            />
            <DescriptionRow
              id={product.id}
              field="Descriere"
              description={product.description.slice(0, 23) + "..."}
              value={product.description}
            />
          </ul>
        </span>
        <span>ID-uri</span>
        <span className="my-2 w-full border-t-[.2px] border-b-[.2px] border-[#9e9e9e69] px-6 py-2">
          <ul className="text-xs list-disc uppercase">
            <li>ID {product.id}</li>
            <li>Stripe Id {product.stripeId}</li>
          </ul>
        </span>
        <span>Pret</span>
        <span className="my-2 w-full border-t-[.2px] border-b-[.2px] border-[#9e9e9e69] px-6 py-2">
          <ul className="list-disc">
            <PriceRow price={product.price} id={product.id} />
            {product.percentOff ? (
              <>
                <li>Reducere : {product.percentOff}%</li>
                <li>
                  Pret redus :
                  {product.price - (product.price * product.percentOff) / 100}{" "}
                  RON
                </li>
              </>
            ) : (
              <></>
            )}
          </ul>
        </span>
        <VariantHeader id={product.id} />
        <span className="my-2 w-full border-t-[.2px] border-[#9e9e9e69] px-6 py-2">
          <ul className="list-disc">
            {product.variants.map((variant) => (
              <VariantRow
                key={variant.name + variant.id}
                id={variant.id}
                productId={product.id!}
                name={variant.name}
              />
            ))}
          </ul>
        </span>
        <KeywordHeader id={product.id} keywords={product.keywords} />
        <span className="my-2 w-full border-t-[.2px] border-[#9e9e9e69] px-6 py-2">
          <ul className="list-disc">
            {product.keywords.map((keyword) => (
              <KeywordRow
                key={keyword}
                id={product.id!}
                name={keyword}
                parent={"keywords"}
                newArr={product.keywords.filter((k) => k !== keyword)}
              />
            ))}
          </ul>
        </span>
      </div>
    </div>
  );
};

export default CatalogueCard;
