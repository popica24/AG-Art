import React from "react";
import FormInput from "./Components/FormInput";
import FormRadio from "./Components/FormRadio";

const Checkout = () => {
  return (
    <div className="text-white bg-black mt-[115.71px] md:mt-[110px] z-10">
      <div className="flex justify-start container mx-auto px-8">
        <span className="text-xl md:text-3xl md:text-start text-center w-full font-thin uppercase py-5">
          Checkout
        </span>
      </div>
      <div className="grid grid-cols-6 container mx-auto px-8 gap-x-10">
        <div className="col-span-4">
          <span>Informatii Livrare</span>
          <div className="border border-white flex flex-col p-4">
            {/* First Row */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <FormInput
                label={"Nume Complet"}
                name={"client_name"}
                id={"client_name"}
                placeholder={"Andrei Popescu"}
                width="w-1/2"
              />
              <FormInput
                label={"Numar Telefon"}
                name={"client_phont"}
                id={"client_phone"}
                placeholder={"+40786141849"}
                width="w-1/2"
              />
            </div>
            {/* First Row */}
            {/* Second Row */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <FormInput
                label={"Email"}
                name={"client_email"}
                id={"client_email"}
                placeholder={"andreip927@gmail.com"}
                width="w-1/2"
              />
              <FormInput
                label={"Oras"}
                name={"client_city"}
                id={"client_city"}
                placeholder={"Pitesti"}
                width="w-1/2"
              />
            </div>
            {/* Second Row */}
            {/* Third Row */}
            <div className="flex flex-row -mx-3 mb-6">
              <FormInput
                label={"Judet"}
                name={"client_state"}
                id={"client_state"}
                placeholder={"Arges"}
                width="w-full"
              />
              <FormInput
                label={"Cod Postal"}
                name={"client_postcode"}
                id={"client_postcode"}
                placeholder={"110250"}
                width="w-1/3"
              />
              <FormInput
                label={"Cod Judet"}
                name={"client_statecode"}
                id={"client_city"}
                placeholder={"AG"}
                width="w-1/2"
              />
            </div>
            {/* Third Row */}
            {/* Fourth Row */}
            <div className="flex flex-row -mx-3 mb-6">
              <FormInput
                label={"Adresa Completa"}
                name={"client_address"}
                id={"client_address"}
                placeholder={"Strada Burebista Bloc H5 AP 43"}
                width="w-full"
              />
            </div>
            {/* Fourth Row */}
          </div>
          <span>Detalii plata</span>
          <div className="border border-white flex flex-col p-4">
            {/* First Row */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <label htmlFor="online_payment">Online cu cardul</label>
              <input type="radio" name="payment_method" id="online_payment" />
              <label htmlFor="cash_payment">Cash la livrare</label>
              <input type="radio" name="payment_method" id="cash_payment" />
            </div>
            {/* First Row */}
          </div>
        </div>
        <div className="col-span-2 border border-white">fasdfasf</div>
      </div>
    </div>
  );
};

export default Checkout;
