import { deleteObject, ref } from "firebase/storage";
import { imageDb } from "../../utils/firebase";
import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";

type Props = {
  name: string;
  url: string;
};

const Banner = (props: Props) => {
  const [hover, setHover] = useState(false);
  const removeBanner = async () => {
    try {
      const filePath = `banners/${props.name}`;
      const fileToDeleteRef = ref(imageDb, filePath);
      await deleteObject(fileToDeleteRef);
      toast.success("Banner inlaturat !");
    } catch (err: any) {
      toast.error("A aparut o eroare " + err);
    }
  };
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="w-full h-[450px] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${props.url})` }}
    >
      {hover && (
        <div className="absolute inset-0 bg-black opacity-50 flex items-center justify-center" />
      )}
      {hover && (
        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
          <RiDeleteBinLine
            size={"60px"}
            className="z-30 cursor-pointer"
            onClick={() => removeBanner()}
          />
        </div>
      )}
    </div>
  );
};

export default Banner;
