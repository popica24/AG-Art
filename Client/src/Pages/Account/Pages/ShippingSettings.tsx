import axios from "axios";
import { useAuth } from "../../../Contexts/AuthContext";
import { UserData } from "../../../Utils/types";
import { Button, Input } from "@material-tailwind/react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  userData: UserData | null;
};
type Inputs = {
  PhoneNumber: string;
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
const ShippingSettings = (props: Props) => {
  const { currentUser } = useAuth();
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const user = {
      Email: currentUser?.email,
      FirstName: props.userData?.firstName,
      LastName: props.userData?.lastName,
      PhoneNumber: data.PhoneNumber,
      ShippingDetails: {
        Phone: data.PhoneNumber,
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
        State: data.BillingState,
      },
    };

    currentUser?.getIdToken().then((token) => {
      axios.put(import.meta.env.VITE_API_URL + "/user", user, {
        params: {
          id: props.userData?.customer,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    });
    console.log(user);
  };
  return (
    <div className="p-16 bg-white rounded-xl text-black my-6 md:my-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center"
      >
        <div className=" mb-5 w-full">
          <span className="text-2xl font-thin w-full text-center lg:text-start">
            Detalii Livrare
          </span>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-evenly w-full">
          <div className="max-w-none w-full lg:w-fit lg:max-w-lg">
            <Input
              {...register("ShippingState")}
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
              {...register("ShippingCity")}
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
              {...register("ShippingZipCode")}
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
              {...register("PhoneNumber")}
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
            {...register("ShippingStreet")}
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
              {...register("BillingState")}
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
              {...register("BillingCity")}
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
              {...register("BillingZipCode")}
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
            {...register("BillingStreet")}
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
            type="submit"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Salveaza Modificarile
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ShippingSettings;
