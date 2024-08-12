import { ChangeEvent, useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { UserData } from "../../Utils/types";
import axios from "axios";
import { useCart } from "../../Contexts/ShoppingCartContext";
import Databox from "./Components/Databox";

const Checkout = () => {
  const [paymentType, setPaymentType] = useState("Cash");
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
    document.title = "Iluminis | Plata";
  }, []);

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPaymentType(event.target.value);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const orderUrl = import.meta.env.VITE_API_URL + "/orders";
    const token = await currentUser?.getIdToken();
    const data = JSON.stringify(cartItems);
    const url = await axios.post(orderUrl, data, {
      params: {
        customer: userData?.customer,
        userId: currentUser!.uid,
        paymentType: paymentType,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    window.location.href = url.data;
  };
  if (!userData || !currentUser || !currentUser.email) {
    return <></>;
  }
  const cartTotal = cartItems.reduce((total, cartItem) => {
    const item = cartItems.find((i) => i.id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);
  return (
    <div className="text-white bg-black mt-[115.71px] md:mt-[110px] z-10">
      <div className="flex justify-start container mx-auto px-8">
        <span className="text-xl md:text-3xl md:text-start text-center w-full font-thin uppercase py-5">
          Finalizare comandă
        </span>
      </div>
      <section className="bg-black py-8 antialiased dark:bg-gray-900 md:py-16">
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-screen-xl px-4 2xl:px-0"
        >
          <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-white sm:text-base">
            <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
              <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                <svg
                  className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Comanda
              </span>
            </li>

            <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
              <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                <svg
                  className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Asteapta
              </span>
            </li>

            <li className="flex shrink-0 items-center">
              <svg
                className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Zambeste
            </li>
          </ol>

          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
            <div className="min-w-0 flex-1 space-y-8">
              {/* Detalii livrare */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white dark:text-white">
                  Detalii Livrare
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Databox
                    text={userData.firstName + " " + userData.lastName}
                    id="full_name"
                    label="Nume Complet"
                  />

                  <Databox text={currentUser.email} id="email" label="Email" />

                  <Databox
                    text={userData.shippingDetails.state}
                    id="shipping_state"
                    label="Judet"
                  />

                  <Databox
                    text={userData.phoneNumber}
                    id="phone_number"
                    label="Telefon"
                  />

                  <Databox
                    text={userData.shippingDetails.zipCode}
                    id="shipping_zipcode"
                    label="Cod Postal"
                  />
                  <Databox
                    text={userData.shippingDetails.city}
                    id="shipping_city"
                    label="Oras"
                  />
                  <div className="sm:col-span-2">
                    <Databox
                      text={userData.shippingDetails.street}
                      id="shipping_address"
                      label="Adresa"
                    />
                  </div>
                </div>
              </div>
              {/* Detalii livrare */}
              {/* Detalii facturare */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white dark:text-white">
                  Detalii Facturare
                </h2>

                <div className="flex flex-col w-full">
                  <div className="flex flex-col md:flex-row items-center w-full">
                    <Databox
                      text={userData.billingDetails.state}
                      id="billing_state"
                      label="Judet"
                    />

                    <div className="md:px-4 w-full">
                      <Databox
                        text={userData.billingDetails.zipCode}
                        id="billing_zipcode"
                        label="Cod Postal"
                      />
                    </div>
                    <Databox
                      text={userData.billingDetails.city}
                      id="billing_city"
                      label="Oras"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Databox
                      text={userData.billingDetails.street}
                      id="billing_address"
                      label="Adresa"
                    />
                  </div>
                </div>
              </div>
              {/* Detalii facturare */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white dark:text-white">
                  Metoda de plata
                </h3>

                <div className="grid lg:grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <label
                      htmlFor="pay_with_card"
                      className="flex items-center cursor-pointer hover:bg-gray-300 transition-colors w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-black focus:border-primary-500 focus:ring-primary-500"
                    >
                      <input
                        value={"Card"}
                        checked={paymentType === "Card"}
                        onChange={handleOptionChange}
                        className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                        type="radio"
                        id="pay_with_card"
                        name="payment_type"
                      />
                      <span className="ms-2">Online cu cardul</span>
                    </label>
                    <label className="flex items-center mt-4 w-full rounded-lg cursor-pointer hover:bg-gray-300 transition-colors border border-gray-300 bg-gray-50 p-2.5 text-sm text-black focus:border-primary-500 focus:ring-primary-500">
                      <input
                        checked={paymentType === "Cash"}
                        value={"Cash"}
                        onChange={handleOptionChange}
                        className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                        type="radio"
                        id="pay_with_cash"
                        name="payment_type"
                      />
                      <label htmlFor="pay_with_cash" className="ms-2">
                        La livrare cash
                      </label>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
              <div className="flow-root">
                <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Subtotal
                    </dt>
                    <dd className="text-base font-medium text-white dark:text-white">
                      RON {cartTotal}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Livrare
                    </dt>
                    <dd className="text-base font-medium text-white dark:text-white">
                      RON 15
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-bold text-white dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-white dark:text-white">
                      RON {cartTotal + 15}
                    </dd>
                  </dl>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Plaseaza comanda
                </button>

                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  Plățile online sunt gestionate și securizate prin Stripe.{" "}
                  <br />
                  Confirm că am citit și sunt de acord cu{" "}
                  <a href="" className="underline">
                    Termeni și Condiții
                  </a>
                  ,{" "}
                  <a href="" className="underline">
                    Politica de Confidențialitate
                  </a>{" "}
                  și{" "}
                  <a href="" className="underline">
                    Folosire Cookies
                  </a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Checkout;
