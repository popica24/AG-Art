import { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { UserData } from "../../Utils/types";
import axios from "axios";
import RadioButton from "../../Components/RadioButton/RadioButton";
import { useCart } from "../../Contexts/ShoppingCartContext";

const Checkout = () => {
  const [paymentType, setPaymentType] = useState("Card");
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const { cartItems } = useCart();

  const getUser = async () => {
    const token = await currentUser?.getIdToken();
    if (token) {
      axios
        .get(import.meta.env.VITE_API_URL + "/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setUserData(response.data));
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = async () => {
    if (!userData || !currentUser) {
      return;
    }
    const orderUrl = import.meta.env.VITE_API_URL + "/orders";
    const token = await currentUser?.getIdToken();
    const data = JSON.stringify(cartItems);
    var url = await axios.post(orderUrl, data, {
      params: {
        customer: userData?.customer,
        userId: currentUser.uid,
        paymentType: paymentType,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (paymentType == "Card" && url.data) {
      window.location.href = url.data;
    }
  };
  return (
    <div className="text-white bg-black mt-[115.71px] md:mt-[110px] z-10">
      <div className="flex justify-start container mx-auto px-8">
        <span className="text-xl md:text-3xl md:text-start text-center w-full font-thin uppercase py-5">
          Finalizare comandă
        </span>
      </div>
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <div className="bg-white text-black p-2 flex flex-col justify-start">
              <span className="font-semibold text-lg mb-2">Datele mele</span>
              <span className="text-sm">
                {userData?.firstName + " " + userData?.lastName}
              </span>
              <span className="text-sm">{userData?.email}</span>
            </div>
            <div className="bg-white text-black p-2 flex flex-col justify-start my-4">
              <span className="font-semibold text-lg mb-2">
                Adresa de facturare
              </span>
              <span className="text-sm">
                {userData?.firstName + " " + userData?.lastName}
              </span>
              <span className="text-sm">{userData?.email}</span>
              <span className="text-sm">{userData?.billingDetails.street}</span>
              <span className="text-sm">
                {userData?.billingDetails.city +
                  " " +
                  userData?.billingDetails.state}
              </span>
              <span className="text-sm">
                {userData?.billingDetails.zipCode}
              </span>
            </div>
            <div className="bg-white text-black p-2 flex flex-col justify-start ">
              <span className="font-semibold text-lg mb-2">Livrare</span>
              <span className="text-sm">
                {userData?.firstName + " " + userData?.lastName}
              </span>
              <span className="text-sm">{userData?.shippingDetails.phone}</span>
              <span className="text-sm">
                {userData?.shippingDetails.street}
              </span>
              <span className="text-sm">
                {userData?.shippingDetails.zipCode}{" "}
                {userData?.shippingDetails.city}
              </span>
              <span className="text-sm">{userData?.shippingDetails.state}</span>
            </div>
            <div className="bg-white text-black p-2 flex flex-col justify-start mt-4">
              <span className="font-semibold text-lg mb-2">Plată</span>
              <RadioButton
                name="payment_methiods"
                id="card_payment"
                label="Cu cardul"
                defaultChecked={false}
              />
              <RadioButton
                id="cash_payment"
                label="Cu cash"
                defaultChecked
                name="payment_methiods"
              />
            </div>
          </div>
        </div>
        <button onClick={handleSubmit}>Checkout</button>
      </div>
    </div>
  );
};

export default Checkout;
