import { ReactNode, createContext, useContext, useState } from "react";
import ShoppingCart from "../Components/ShoppingCart/ShoppingCart";
import { useLocalStorage } from "../Hooks/useLocalStorage";

const ShoppingCartContext = createContext({} as ShoppingCartContext);

type CartItem = {
  id: number;
  variant: string;
  quantity: number;
  imagePath: string;
  price: number;
  name: string;
};

type ShoppingCartProviderProps = {
  children: ReactNode;
};
type IncreaseCartQuantityProps = {
  id: number;
  variant: string;
  imagePath: string;
  price: number;
  name: string;
  oldPrice: number;
};
type RemoveFromCartProps = {
  id: number;
  variant: string;
  name: string;
};
type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (props: IncreaseCartQuantityProps) => void;
  decreaseCartQuantity: (props: RemoveFromCartProps) => void;
  removeFromCart: (props: RemoveFromCartProps) => void;
};

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id == id)?.quantity || 0;
  }
  function increaseCartQuantity({
    id,
    variant,
    imagePath,
    price,
    name,
  }: IncreaseCartQuantityProps) {
    setCartItems((currItems) => {
      const itemIndex = currItems.findIndex(
        (item) => item.id === id && item.variant == variant && item.name == name
      );

      if (itemIndex === -1) {
        return [
          ...currItems,
          { id, variant, imagePath, price, name, quantity: 1 },
        ];
      } else {
        return currItems.map((item, index) =>
          index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
    });
  }

  function decreaseCartQuantity({ id, variant, name }: RemoveFromCartProps) {
    setCartItems((currItems) => {
      const itemIndex = currItems.findIndex(
        (item) => item.id === id && item.variant == variant && item.name == name
      );
      if (itemIndex === -1) {
        return currItems;
      } else {
        const updatedItems = currItems.map((item, index) =>
          index === itemIndex ? { ...item, quantity: item.quantity - 1 } : item
        );
        return updatedItems.filter((item) => item.quantity > 0);
      }
    });
  }

  function removeFromCart({ id, variant, name }: RemoveFromCartProps) {
    setCartItems((currItems) => {
      return currItems.filter(
        (item) =>
          !(item.id === id && item.variant === variant && item.name === name)
      );
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
      {isOpen && (
        <div className="fixed inset-0 pointer-events-auto z-[9995] bg-black bg-opacity-60 backdrop-blur-sm"></div>
      )}
    </ShoppingCartContext.Provider>
  );
}

export const useCart = () => {
  return useContext(ShoppingCartContext);
};
