import { useState } from "react";
import { IoIosRemove } from "react-icons/io";
import { toast } from "react-toastify";
import { useVariants } from "../../../../../context/VariantContext";
import { RemoveFolder } from "../../../../../utils/StorageBucketUtils";

type Props = {
  id: number;
  name: string;
  productId: number;
};

const VariantRow = (props: Props) => {
  const variants = useVariants();
  const [hover, setHover] = useState(false);

  const handleRemove = async () => {
    try {
      const folderPath = `${props.productId}/variants/${props.name}`;
      RemoveFolder(folderPath);
      await variants?.delete(props.id);
      toast.success("❌💡Culoare inlaturata cu success!");
    } catch (err: any) {
      toast.error("🤕 A aparut o eroare : " + err.response.data.detail);
    }
  };

  return (
    <li>
      <form
        className="inline-flex items-center w-full relative whitespace-nowrap"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <span>{props.name}</span>
        {hover && (
          <IoIosRemove
            className="absolute size-[18px] right-0 cursor-pointer"
            onClick={handleRemove}
          />
        )}
      </form>
    </li>
  );
};

export default VariantRow;
