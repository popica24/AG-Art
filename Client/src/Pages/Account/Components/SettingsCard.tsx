import { UserData } from "../../../Utils/types";

type Props = {
  userData: UserData | null;
};

const SettingsCard = (props: Props) => {
  return (
    <>
      <div className="bg-white text-black p-4 m-4 rounded">
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
          <p className="text-[11px] mt-3">Cod Postal</p>
          <span className="text-[13px]">
            {props.userData?.shippingDetails.zipCode}
          </span>
        </div>
      </div>
      <div className="bg-white text-black p-4 m-4 rounded">
        <div className="flex flex-col items-start">
          <div className="flex flex-row items-center justify-between w-full mb-8">
            <span className="text-[16px] font-semibold">Adresă de Livrare</span>
            <span className="underline text-[13px]">Editare</span>
          </div>
          <span className="text-[13px]">
            {props.userData?.shippingDetails.street}
          </span>
          <span className="text-[13px]">
            {props.userData?.shippingDetails.zipCode}{" "}
            {props.userData?.shippingDetails.city}
          </span>
          <span className="text-[13px]">
            {props.userData?.shippingDetails.state}
          </span>
        </div>
      </div>
      <div className="bg-white text-black p-4 m-4 rounded">
        <div className="flex flex-col items-start">
          <div className="flex flex-row items-center justify-between w-full mb-8">
            <span className="text-[16px] font-semibold">
              Adresă de Facturare
            </span>
            <span className="underline text-[13px]">Editare</span>
          </div>
          <span className="text-[13px]">
            {props.userData?.billingDetails.street}
          </span>
          <span className="text-[13px]">
            {props.userData?.billingDetails.zipCode}{" "}
            {props.userData?.billingDetails.city}
          </span>
          <span className="text-[13px]">
            {props.userData?.billingDetails.state}
          </span>
        </div>
      </div>
    </>
  );
};

export default SettingsCard;
