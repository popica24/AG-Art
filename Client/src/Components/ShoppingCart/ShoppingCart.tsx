import { Button, Drawer, Typography } from "@material-tailwind/react";
import { useCart } from "../../Contexts/ShoppingCartContext";
import CartItem from "./Components/CartItem";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { FormEvent, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
type ShoppingCartProps = {
  isOpen: boolean;
};

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const [loading, setLoading] = useState(false);
  const { cartItems, closeCart } = useCart();
  const handleCheckout = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const data = JSON.stringify(cartItems);
    const response = await fetch(`${API_URL}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    const session = await response.json();
    if (session.url) {
      window.location.href = session.url;
    }
  };

  return (
    <div className="z-50">
      <Drawer
        overlay={false}
        open={isOpen}
        onClose={closeCart}
        className="p-4"
        size={330}
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
            <form onSubmit={(e) => handleCheckout(e)}>
              <Button
                disabled={loading}
                type="submit"
                size="lg"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {loading ? <>Loading</> : <>Checkout</>}
              </Button>
            </form>
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
