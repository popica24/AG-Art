import { Drawer, Typography } from "@material-tailwind/react";
import { useCart } from "../../Contexts/ShoppingCartContext";
import CartItem from "./Components/CartItem";
import { LockClosedIcon } from "@heroicons/react/24/solid";

type ShoppingCartProps = {
  isOpen: boolean;
};

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const { cartItems, closeCart } = useCart();
  return (
    <div className="z-50">
      <Drawer
        overlay={false}
        open={isOpen}
        onClose={closeCart}
        className="p-4"
        size={440}
        placement="right"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="flex flex-col h-full">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => <CartItem key={index} {...item} />)
          ) : (
            <span className="h-full flex flex-col items-center justify-center text-xl font-thin">
              Cosul de cumparaturi este gol
            </span>
          )}
          {cartItems.length > 0 && (
            <div className="ms-auto text-3xl">
              Total{" "}
              {cartItems.reduce((total, cartItem) => {
                const item = cartItems.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)}{" "}
              RON
            </div>
          )}
          <div className="absolute  bottom-0 left-0 right-0 flex flex-col items-center w-full py-6 bg-black bg-opacity-60 backdrop-blur-sm">
            <a
              href="/checkout"
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none gap-3"
            >
              Checkout
            </a>

            <Typography
              variant="small"
              color="white"
              className="mt-2 flex items-center justify-center gap-2 font-medium opacity-60"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Payments are secure
              and encrypted
            </Typography>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default ShoppingCart;
