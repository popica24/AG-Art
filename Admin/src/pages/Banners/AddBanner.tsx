import { ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { imageDb } from "../../utils/firebase";
import { toast } from "react-toastify";
import { FaUpload } from "react-icons/fa";
import PopupContainer from "../../components/PopupContainer";
type Props = {
  handleClose: () => void;
};
const AddBanner = (props: Props) => {
  const [file, setFile] = useState<Blob | undefined>();
  const uploadFile = async () => {
    if (!file) return;
    try {
      const fileRef = ref(imageDb, "banners/" + Date.now().toString());
      await uploadBytes(fileRef, file);
      toast.success("Banner incarcat !");
    } catch (err) {
      toast.error("Eroare la incarcarea bannerului " + err);
    }
  };
  return (
    <PopupContainer
      handleClose={props.handleClose}
      title={"Banners"}
      subtitle={"Add Banner"}
    >
      <>
        {file ? (
          <div
            className="h-[450px] w-full aspect-square bg-cover bg-center"
            style={{
              backgroundImage: `url(${URL.createObjectURL(file)})`,
            }}
          />
        ) : (
          <label
            htmlFor="upload"
            className="h-[450px] w-full border-[2px] border-dashed border-gray-400 flex items-center justify-center cursor-pointer"
          >
            <FaUpload size={"40px"} />
          </label>
        )}
        {file && (
          <div className="w-full text-center">
            <button
              className="mt-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={() => uploadFile()}
            >
              Upload
            </button>
          </div>
        )}
        <input
          id="upload"
          type="file"
          onChange={(e) => setFile(e.target.files![0])}
          className="hidden"
        />
      </>
    </PopupContainer>
  );
};

export default AddBanner;
