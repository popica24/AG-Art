import { SubmitHandler, useForm } from "react-hook-form";
import PopupContainer from "../../../components/PopupContainer";
import { toast } from "react-toastify";
import { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { imageDb } from "../../../utils/firebase";
import { useProducts } from "../../../context/ProductContext";
import { PostProduct } from "../../../utils/types";
import { CategoryToInt } from "../../../utils/CategoryToInt";

type Props = {
  handleClose: () => void;
};

type Inputs = {
  name: string;
  category: string;
  description: string;
  material: string;
  height: string;
  width: string;
  length: string;
  weight: string;
  lightSource: string;
  price: number;
  keywords: string;
};

const AddProduct = (props: Props) => {
  const ONLY_NUMBERS = /^\d+$/;
  const products = useProducts();
  const [image, setImage] = useState<Blob | null>(null);

  const uploadToFirebase = async (id: number) => {
    const heroRef = ref(imageDb, `${id}/hero.jpg`);
    await uploadBytes(heroRef, image!);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const keywords = data.keywords
        .split(",")
        .map((word) => word.trim().toLowerCase())
        .filter((word) => word !== "");
      const category = data.category.replace(/\s+/g, "-").toLowerCase().trim();

      const lampModel: PostProduct = {
        name: data.name,
        categoryId: CategoryToInt(category),
        material: data.material,
        height: Number(data.height),
        width: Number(data.width),
        length: Number(data.length),
        weight: Number(data.weight),
        lightSource: data.lightSource,
        price: data.price,
        description: data.description,
        keywords: keywords,
      };
      const result = await products?.create(lampModel);
      const id = Number(result?.data?.id);
      await uploadToFirebase(id);
      toast.success("➕💡Lampa adaugata cu succes !");
    } catch (err: any) {
      toast.success("❌🤕 A aparut o eroare" + err);
    }
  };

  return (
    <PopupContainer
      handleClose={props.handleClose}
      title={"Products"}
      subtitle={"Add Product"}
      wrapperClass="w-fit pb-16 ps-16"
    >
      <div className="grid grid-cols-2 place-content-center">
        <div className="col-span-1">
          <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap -mx-3 mb-6">
              {/* Product Name */}
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-product-name"
                >
                  Product Name
                </label>
                <input
                  {...register("name")}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-product-name"
                  type="text"
                  placeholder="Lampa Mele"
                />
              </div>
              {/* Product Name */}
              {/* Product Price */}
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-product-price"
                >
                  Price (in RON)
                </label>
                <input
                  {...register("price", {
                    pattern: ONLY_NUMBERS,
                  })}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-product-price"
                  type="text"
                  placeholder="100"
                />
              </div>
              {/* Product Price */}
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              {/* Product Length */}
              <div className="w-1/4 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-product-length"
                >
                  Length (cm)
                </label>
                <input
                  {...register("length", {
                    pattern: ONLY_NUMBERS,
                  })}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-product-price"
                  type="text"
                  placeholder="15"
                />
              </div>
              {/* Product Length */}
              {/* Product Width */}
              <div className="w-1/4 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-product-width"
                >
                  Width (cm)
                </label>
                <input
                  {...register("width", {
                    pattern: ONLY_NUMBERS,
                  })}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-product-width"
                  type="text"
                  placeholder="20"
                />
              </div>
              {/* Product Width */}
              {/* Product Height */}
              <div className="w-1/4 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-product-height"
                >
                  Height (cm)
                </label>
                <input
                  {...register("height", {
                    pattern: ONLY_NUMBERS,
                  })}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-product-height"
                  type="text"
                  placeholder="20"
                />
              </div>
              {/* Product Height */}
              {/* Product Weight */}
              <div className="w-1/4 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-product-weight"
                >
                  Weight (g)
                </label>
                <input
                  {...register("weight", {
                    pattern: ONLY_NUMBERS,
                  })}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-product-weight"
                  type="text"
                  placeholder="20"
                />
              </div>
              {/* Product Weight */}
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              {/* Product Light Source */}
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-product-light"
                >
                  Light Source
                </label>
                <input
                  {...register("lightSource")}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-product-light"
                  type="text"
                  placeholder="Bec"
                />
              </div>
              {/* Product Light Source */}
              {/* Product Material  */}
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-product-material"
                >
                  Material
                </label>
                <input
                  {...register("material")}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-product-material"
                  type="text"
                  placeholder="Lemn"
                />
              </div>
              {/* Product Material */}
              {/* Product Category */}
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-product-material"
                >
                  Category
                </label>
                <div className="relative">
                  <select
                    {...register("category")}
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                  >
                    <option>Pendule</option>
                    <option>Lampadare de podea</option>
                    <option>Lampi de masa</option>
                    <option>Abajururi din lemn</option>
                    <option>Becuri</option>
                    <option>Tabluri din lemn</option>
                    <option>Articole sezoniere</option>
                    <option>Aplice pe perete</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Product Category */}
              {/* Product Keywords  */}
              <div className="w-full px-3 my-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-product-keywords"
                >
                  Keywords (separe the Keywords with a comma ",")
                </label>
                <input
                  {...register("keywords")}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-product-keywords"
                  type="text"
                  placeholder="wood, dark, table, tiramisu"
                />
              </div>
              {/* Product Keywords */}
            </div>
            <input type="submit" />
          </form>
        </div>
        <div className="col-span-1">
          <div className="flex items-center justify-center w-full h-full">
            <label
              className="w-full h-full aspect-square max-w-[90vmin] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[320px] xl:max-w-[391.53px] border-dashed border-black border-2"
              htmlFor="product-hero-image"
            >
              <div
                className="bg-cover bg-center bg-no-repeat relative w-full h-full aspect-square max-w-[90vmin] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[320px] xl:max-w-[391.53px] shadow-2xl"
                style={{
                  backgroundImage: image
                    ? `url(${URL.createObjectURL(image!)})`
                    : "url(/notfound.jpg)",
                }}
              ></div>
            </label>
            <input
              type="file"
              className="hidden"
              id="product-hero-image"
              onChange={(e) => setImage(e.target.files![0])}
            />
          </div>
        </div>
      </div>
    </PopupContainer>
  );
};

export default AddProduct;
