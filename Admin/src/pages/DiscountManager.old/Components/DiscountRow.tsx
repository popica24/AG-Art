import { removeHyphens } from "../../../utils/RemoveHyphens";
import { Product } from "../../../utils/types";

const DiscountRow = (lamp: Product) => {
  return (
    <div className="m-4 max-w-[364px] aspect-[3/4] p-4 bg-clip-border rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-md">
      <div className="flex flex-col items-start">
        <span className="w-full text-center text-2xl">{lamp.name}</span>
        <span className="mt-2">Caracteristici</span>
        <span className="my-2 w-full border-t-[.2px] border-b-[.2px] border-[#9e9e9e69] px-6 py-2">
          <ul className="list-disc">
            <li>Categorie - {removeHyphens(lamp.categoryId)!}</li>

            <li>Material - {lamp.material}</li>
            <li>Dimensiuni - {lamp.dimensions}</li>

            <li>Sursa de Lumina - {lamp.lightSource}</li>
          </ul>
        </span>
        <span>ID-uri</span>
        <span className="my-2 w-full border-t-[.2px] border-b-[.2px] border-[#9e9e9e69] px-6 py-2">
          <ul className="text-xs list-disc uppercase">
            <li>ID {lamp.id}</li>
          </ul>
        </span>
        <span>Pret</span>
        <span className="my-2 w-full border-t-[.2px] border-b-[.2px] border-[#9e9e9e69] px-6 py-2">
          <ul className="list-disc">
            <li>Pret : {lamp.price} RON</li>
            <li>Reducere : {lamp.percentOff}%</li>
            <li>
              Pret redus :{" "}
              {lamp.price! - (lamp.price! * lamp.percentOff!) / 100}
              RON
            </li>
          </ul>
        </span>
      </div>
    </div>
  );
};

export default DiscountRow;
