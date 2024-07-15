import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../../Contexts/AuthContext";
import axios from "axios";
import { FaCheck } from "react-icons/fa";

type Inputs = {
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  ShippingPhone: string;
  ShippingStreet: string;
  ShippingZipCode: string;
  ShippingCity: string;
  ShippingCountryCode: string;
  ShippingState?: string;
  BillingStreet?: string;
  BillingZipCode?: string;
  BillingCity?: string;
  BillingCountryCode?: string;
  BillingState?: string;
};

const CompleteAccount = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const userObject = {
      Email: currentUser?.email,
      FirstName: data.FirstName,
      LastName: data.LastName,
      PhoneNumber: data.PhoneNumber,
      ShippingDetails: {
        Phone: data.ShippingPhone,
        Street: data.ShippingStreet,
        ZipCode: data.ShippingZipCode,
        City: data.ShippingCity,
        CountryCode: "RO",
        State: data.ShippingState,
      },
      BillingDetails: {
        Street: data.BillingStreet,
        ZipCode: data.BillingZipCode,
        City: data.BillingCity,
        CountryCode: "RO",
        State: data.ShippingState,
      },
    };
    try {
      const idToken = await currentUser?.getIdToken();

      await axios.post(`${import.meta.env.VITE_API_URL}/user`, userObject, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
    } catch (err: any) {
      setLoading(false);
      setSuccess(false);
      console.error("Error at completing account " + err);
    }
  };
  const [shippingAndBillingAreSame, setShippingAndBillingSame] = useState(true);
  return (
    <div
      id="login-popup"
      className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex"
    >
      <div className="relative p-4 w-full max-w-xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow">
          <div className="p-5">
            <h3 className="text-2xl mb-0.5 font-medium"></h3>
            <p className="mb-4 text-sm font-normal text-gray-800"></p>

            <div className="text-center">
              <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                Completeaza cont
              </p>
            </div>

            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <span>Detalii</span>

              <div className="grid grid-cols-2 gap-x-4">
                <div className="col-span-1">
                  <input
                    disabled={loading}
                    {...register("FirstName")}
                    type="text"
                    autoComplete="FirstName"
                    required
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                    placeholder="Nume"
                  />
                </div>
                <div className="col-span-1">
                  <input
                    disabled={loading}
                    {...register("LastName")}
                    type="text"
                    autoComplete="email"
                    required
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                    placeholder="Prenume"
                  />
                </div>
              </div>
              <div className="my-4">
                <input
                  disabled={loading}
                  {...register("PhoneNumber")}
                  type="text"
                  autoComplete="PhoneNumber"
                  required
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                  placeholder="Numar Telefon"
                />
              </div>
              <div className="flex flex-row justify-between">
                <span>Adresa Livrare</span>
                {!shippingAndBillingAreSame && <span>Adresa Facturare</span>}
              </div>
              <div
                className={`grid ${
                  shippingAndBillingAreSame
                    ? "grid-cols-1"
                    : "grid-cols-2 gap-x-4"
                }`}
              >
                {/* Shipping */}
                <div className="col-span-1">
                  <input
                    disabled={loading}
                    {...register("ShippingPhone")}
                    type="text"
                    autoComplete="ShippingPhone"
                    required
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                    placeholder="Numar Telefon"
                  />
                  <input
                    disabled={loading}
                    {...register("ShippingStreet")}
                    type="text"
                    autoComplete="ShippingPhone"
                    required
                    className="my-4 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                    placeholder="Adresa (strada, bloc, etaj, apartament)"
                  />
                  <input
                    disabled={loading}
                    {...register("ShippingZipCode")}
                    type="text"
                    autoComplete="ShippingZipCode"
                    required
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                    placeholder="Cod Postal"
                  />
                  <input
                    disabled={loading}
                    {...register("ShippingCity")}
                    type="text"
                    autoComplete="ShippingCity"
                    required
                    className="my-4 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                    placeholder="Oras"
                  />
                  <input
                    disabled={loading}
                    {...register("ShippingState")}
                    type="text"
                    autoComplete="ShippingState"
                    required
                    className="my-4 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                    placeholder="Judet"
                  />
                </div>
                {/* Shipping */}
                {/* Billing */}
                {!shippingAndBillingAreSame && (
                  <div className="col-span-1">
                    <input
                      disabled={loading}
                      {...register("BillingStreet")}
                      type="text"
                      autoComplete="BillingStreet"
                      required
                      className="my-4 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                      placeholder="Adresa (strada, bloc, etaj, apartament)"
                    />
                    <input
                      disabled={loading}
                      {...register("BillingZipCode")}
                      type="text"
                      autoComplete="BillingZipCode"
                      required
                      className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                      placeholder="Cod Postal"
                    />
                    <input
                      disabled={loading}
                      {...register("BillingCity")}
                      type="text"
                      autoComplete="BillingCity"
                      required
                      className="my-4 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                      placeholder="Oras"
                    />
                    <input
                      disabled={loading}
                      {...register("BillingState")}
                      type="text"
                      autoComplete="BillingState"
                      required
                      className="my-4 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                      placeholder="Judet"
                    />
                  </div>
                )}
                {/* Billing */}
              </div>
              <div className="flex flex-row items-center justify-center w-full mb-4">
                <input
                  disabled={loading}
                  type="checkbox"
                  id="ShipBill"
                  defaultChecked={true}
                  onChange={() =>
                    setShippingAndBillingSame(!shippingAndBillingAreSame)
                  }
                />
                <label htmlFor="ShipBill" className="ms-1">
                  Adresa de livrare este aceeasi cu cea de facturare
                </label>
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
              >
                {success ? (
                  <FaCheck />
                ) : loading ? (
                  <img src="hourglass.gif" className="h-[20px]" alt="" />
                ) : (
                  "Finalizeaza"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteAccount;
