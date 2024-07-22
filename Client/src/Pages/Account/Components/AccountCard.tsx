import React from "react";

type Props = {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined | null;
};

const AccountCard = (props: Props) => {
  if (!props.firstName || !props.lastName || !props.email) {
    return <></>;
  }
  return (
    <div className="bg-white rounded-xl p-8 text-black">
      <div className="flex flex-col items-center justify-center">
        <span className="bg-black rounded-full text-center text-3xl p-3 text-white border-[3px] border-[#939393]">
          {props.firstName![0] + props.lastName![0]}
        </span>
        <span className="text-lg font-medium mt-2">
          {props.firstName + " " + props.lastName}
        </span>
        <span className="text-base">{props.email}</span>
        <span className="text-sm text-red-500 mt-3 border-b hover:border-b-red-500 cursor-pointer">
          Iesi din cont
        </span>
      </div>
    </div>
  );
};

export default AccountCard;
