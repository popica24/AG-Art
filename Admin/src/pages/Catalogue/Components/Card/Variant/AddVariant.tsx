import { useState } from "react";
import { toast } from "react-toastify";
import { useVariants } from "../../../../../context/VariantContext";
import {
  UploadFolder,
  UploadNuance,
} from "../../../../../utils/StorageBucketUtils";
import { Variant } from "../../../../../utils/types";
import PopupContainer from "../../../../../components/PopupContainer";
type Props = {
  id: number;
  handleClose: () => void;
};
const AddVariant = (props: Props) => {
  const variants = useVariants();
  const [variantName, setVariantName] = useState("");
  const [colorCode, setColorCode] = useState("");
  const [nuancePic, setNuancePic] = useState<Blob | null>(null);
  const [nuanceOne, setNuanceOne] = useState<Blob | null>(null);
  const [nuanceTwo, setNuanceTwo] = useState<Blob | null>(null);
  const [nuanceThree, setNuanceThree] = useState<Blob | null>(null);
  const [nuanceFour, setNuanceFour] = useState<Blob | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const blobs = [nuanceOne!, nuanceTwo!, nuanceThree!, nuanceFour!];
      const folderPath = props.id + "/variants/" + variantName;
      UploadFolder(folderPath, blobs);
      UploadNuance(folderPath, nuancePic!);

      const variant: Partial<Variant> = {
        name: variantName,
        colorCode: colorCode,
        productId: props.id,
      };

      await variants?.create(variant);

      toast.success("✅💡Variatie adaugata !");
    } catch (err: any) {
      toast.error("🤕 A aparut o eroare : " + err);
    }
  };

  return (
    <PopupContainer
      wrapperClass="w-fit"
      title="Variants"
      subtitle="Add Variant"
      handleClose={props.handleClose}
    >
      <form action="POST" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setNuancePic(e.target.files![0])}
          id="nuancePhoto"
          className="hidden"
          type="file"
          placeholder="Nume Culori"
          accept=".jpg"
          required
        />

        <input
          onChange={(e) => setNuanceOne(e.target.files![0])}
          id="nuancePhotoOne"
          className="hidden"
          type="file"
          placeholder="Nume Culori"
          accept=".jpg"
          required
        />
        <input
          onChange={(e) => setNuanceTwo(e.target.files![0])}
          id="nuancePhotoTwo"
          className="hidden"
          type="file"
          placeholder="Nume Culori"
          accept=".jpg"
          required
        />
        <input
          onChange={(e) => setNuanceThree(e.target.files![0])}
          id="nuancePhotoThree"
          className="hidden"
          type="file"
          placeholder="Nume Culori"
          accept=".jpg"
          required
        />
        <input
          onChange={(e) => setNuanceFour(e.target.files![0])}
          id="nuancePhotoFour"
          className="hidden"
          type="file"
          placeholder="Nume Culori"
          accept=".jpg"
          required
        />
        <input type="submit" className="hidden" id="submitForm" />
      </form>
      <div className="md:grid flex flex-col md:grid-cols-2 gap-x-2 container px-8 mx-auto">
        <label className="col-span-1 cursor-pointer" htmlFor="nuancePhoto">
          <div
            className="bg-cover bg-center bg-no-repeat md:h-[468px] md:w-[624px] aspect-[6/3] relative shadow-xl"
            style={{
              backgroundImage: nuancePic
                ? `url(${URL.createObjectURL(nuancePic)})`
                : "url(/elementor-placeholder-image.webp)",
            }}
          >
            <input
              value={variantName}
              onChange={(e) => setVariantName(e.target.value)}
              placeholder="Numele Culorii"
              type="text"
              className="absolute bottom-10 left-1/2 -translate-x-1/2 h-[44px] bg-black text-white w-[90%] px-4 rounded-xl text-center"
            />
          </div>
        </label>
        <div className="col-span-1">
          <div className="grid grid-cols-2">
            <label
              className="h-[231px] w-[308px] bg-center bg-cover bg-no-repeat mb-1 shadow-xl"
              htmlFor="nuancePhotoOne"
              style={{
                backgroundImage: nuanceOne
                  ? `url(${URL.createObjectURL(nuanceOne)})`
                  : "url(/elementor-placeholder-image.webp)",
              }}
            ></label>
            <label
              className="h-[231px] w-[308px] bg-center bg-cover bg-no-repeat mb-1 shadow-xl"
              htmlFor="nuancePhotoTwo"
              style={{
                backgroundImage: nuanceTwo
                  ? `url(${URL.createObjectURL(nuanceTwo)})`
                  : "url(/elementor-placeholder-image.webp)",
              }}
            ></label>
            <label
              className="h-[231px] w-[308px] bg-center bg-cover bg-no-repeat mb-1 shadow-xl"
              htmlFor="nuancePhotoThree"
              style={{
                backgroundImage: nuanceThree
                  ? `url(${URL.createObjectURL(nuanceThree)})`
                  : "url(/elementor-placeholder-image.webp)",
              }}
            ></label>
            <label
              className="h-[231px] w-[308px] bg-center bg-cover bg-no-repeat mb-1 shadow-xl"
              htmlFor="nuancePhotoFour"
              style={{
                backgroundImage: nuanceFour
                  ? `url(${URL.createObjectURL(nuanceFour)})`
                  : "url(/elementor-placeholder-image.webp)",
              }}
            ></label>
          </div>
        </div>
      </div>
      <input type="color" onChange={(e) => setColorCode(e.target.value)} />
      <div className="container px-8 mx-auto text-center my-8">
        <label
          className="bg-white hover:bg-[#d8d8d8] text-black font-bold py-2 px-4 border-b-4 border-[#d8d8d8] hover:border-[#a1a1a1] rounded cursor-pointer"
          htmlFor="submitForm"
        >
          Upload !
        </label>
      </div>
    </PopupContainer>
  );
};

export default AddVariant;
