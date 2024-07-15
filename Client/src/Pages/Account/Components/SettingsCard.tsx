import { UserData } from "../../../Utils/types";

type Props = {
  userData: UserData | null;
};

const SettingsCard = (props: Props) => {
  return (
    <div className="bg-white text-black p-4 m-4">
      <div className="flex flex-col items-start">
        <div className="flex flex-row items-center justify-between w-full mb-8">
          <span className="text-[16px] font-semibold">Detaliile mele</span>
          <span className="underline text-[13px]">Editare</span>
        </div>
        <p className="text-[11px]">Prenume</p>
        <span className="text-[13px]">{props.userData?.firstName}</span>
        <p className="text-[11px] mt-3">Nume</p>
        <span className="text-[13px]">{props.userData?.lastName}</span>
        <p className="text-[11px] mt-3">Număr de telefon</p>
        <span className="text-[13px]">{props.userData?.phoneNumber}</span>
        <p className="text-[11px] mt-3">Oras</p>
        <span className="text-[13px]">{props.userData?.shippingDetails.city}</span>
        <p className="text-[11px] mt-3">Adresa</p>
        <span className="text-[13px]">{props.userData?.shippingDetails.street}</span>
        <p className="text-[11px] mt-3">Judet</p>
        <span className="text-[13px]">{props.userData?.shippingDetails.state}</span>
        <p className="text-[11px] mt-3">Oras</p>
        <span className="text-[13px]">{props.userData?.shippingDetails.zipCode}</span>
      </div>
    </div>
  );
};

export default SettingsCard;
