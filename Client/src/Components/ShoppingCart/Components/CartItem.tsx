import { useCart } from "../../../Contexts/ShoppingCartContext";

type Props = {
  id: number;
  variant: string;
  quantity: number;
  imagePath: string;
  price: number;
  name: string;
};

const CartItem = (props: Props) => {
  const { removeFromCart } = useCart();
  return (
    <div className="flex flex-row items-center my-4 shadow-md px-3 md:px-1">
      <img
        src={props.imagePath}
        alt={props.variant}
        width={125}
        className="object-cover rounded md:w-[125px] w-[75px] h-auto"
      />
      <div className="flex flex-col items-start w-full">
        <div className="ps-2 font-medium">{props.name}</div>
        <div className="ps-2">
          <div>
            {props.variant}
            {props.quantity > 0 && (
              <span className=" ms-1 text-black text-[.65rem]">
                x{props.quantity}
              </span>
            )}
          </div>
          <div className="text-black text-[.75rem]">{props.price} RON</div>
        </div>
      </div>
      <div className="whitespace-nowrap me-2">
        {props.price * props.quantity} RON
      </div>
      <img
        src="/trash.svg"
        alt=""
        onClick={() =>
          removeFromCart({
            id: props.id,
            variant: props.variant,
            name: props.name,
          })
        }
        className="cursor-pointer"
      />
    </div>
  );
};

export default CartItem;
