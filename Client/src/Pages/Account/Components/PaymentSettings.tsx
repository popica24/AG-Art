import React from "react";

type Props = {};

const PaymentSettings = (props: Props) => {
  return (
    <div className="bg-white text-black p-4 m-4">
      <div className="flex flex-col items-start">
        <div className="flex flex-row items-center justify-between w-full mb-8">
          <span className="text-[16px] font-semibold">Setări plată</span>
          <span className="underline text-[13px]">Editare</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSettings;
