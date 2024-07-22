import { UserData } from "../../../Utils/types";
import { Button, Input } from "@material-tailwind/react";

type Props = {
  userData: UserData | null;
};

const ShippingSettings = (props: Props) => {
  return (
    <div className="p-16 bg-white rounded-xl text-black my-6 md:my-0">
      <div className="flex flex-col justify-center items-center">
        <div className=" mb-5 w-full">
          <span className="text-2xl font-thin w-full text-center lg:text-start">
            Detalii Livrare
          </span>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-evenly w-full">
          <div className="max-w-none w-full lg:w-fit lg:max-w-lg">
            <Input
              className="w-full"
              variant="static"
              label="Judet"
              color="black"
              placeholder={props.userData?.shippingDetails.state}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <div className="max-w-none w-full lg:w-fit lg:max-w-lg">
            <Input
              className="w-full"
              variant="static"
              label="Oras"
              color="black"
              placeholder={props.userData?.shippingDetails.city}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <div className="max-w-none w-full lg:w-fit lg:max-w-lg">
            <Input
              className="w-full"
              variant="static"
              label="Cod Postal"
              color="black"
              placeholder={props.userData?.shippingDetails.zipCode}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-start w-full lg:px-12 lg:my-6">
          <div className="max-w-none w-full lg:w-fit lg:max-w-lg">
            <Input
              className="w-full"
              variant="static"
              label="Telefon"
              color="black"
              placeholder={props.userData?.shippingDetails.phone}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <div className="max-w-none w-full lg:w-fit lg:max-w-lg lg:mx-14">
            <Input
              disabled
              className="w-full"
              variant="static"
              label="Tara"
              color="black"
              placeholder={props.userData?.shippingDetails.countryCode}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-evenly w-full xl:px-12">
          <Input
            className="w-full"
            variant="static"
            label="Adresa"
            color="black"
            placeholder={props.userData?.shippingDetails.street}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />
        </div>
        <div className=" mb-5 w-full mt-6">
          <span className="text-2xl font-thin w-full text-start">
            Detalii Facturare
          </span>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-evenly w-full">
          <div className="max-w-lg">
            <Input
              className="w-full"
              variant="static"
              label="Judet"
              color="black"
              placeholder={props.userData?.billingDetails.state}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <div className="max-w-lg">
            <Input
              className="w-full"
              variant="static"
              label="Oras"
              color="black"
              placeholder={props.userData?.billingDetails.city}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <div className="max-w-lg">
            <Input
              className="w-full"
              variant="static"
              label="Cod Postal"
              color="black"
              placeholder={props.userData?.billingDetails.zipCode}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-evenly w-full px-12 my-6">
          <Input
            className="w-full"
            variant="static"
            label="Adresa"
            color="black"
            placeholder={props.userData?.billingDetails.street}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />
          <div className="max-w-[200px] ms-14">
            <Input
              disabled
              variant="static"
              label="Tara"
              color="black"
              placeholder={props.userData?.billingDetails.countryCode}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
        </div>
        <div className="flex flex-row items-end justify-end w-full px-8">
          <Button
            className="me-4"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Renunta
          </Button>
          <Button
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Salveaza Modificarile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShippingSettings;
