import { useState } from "react";
import { useProducts } from "../../../../context/ProductContext";
import { Product } from "../../../../utils/types";
import { BiCheck } from "react-icons/bi";

type Props = {
  id: number;
  visible: boolean;
  categoryId: number;
};

const VisibleButton = (props: Props) => {
  const productRepo = useProducts();
  const [visible, setVisible] = useState(props.visible);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newLamp: Partial<Product> = {
      visible: visible,
      categoryId: props.categoryId,
    };
    await productRepo?.update(props.id, newLamp);
  };
  return (
    <form className="inline-flex items-center" onSubmit={handleSubmit}>
      <input
        type="checkbox"
        checked={visible}
        onChange={() => setVisible(!visible)}
      />
      {visible !== props.visible && (
        <button type="submit">
          <BiCheck />
        </button>
      )}
    </form>
  );
};

export default VisibleButton;
