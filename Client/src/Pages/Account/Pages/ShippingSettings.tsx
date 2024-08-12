import axios from "axios";
import { useAuth } from "../../../Contexts/AuthContext";
import { UserData } from "../../../Utils/types";
import { Button, Input } from "@material-tailwind/react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";

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
      PhoneNumber:
        data.PhoneNumber === ""
          ? props.userData?.phoneNumber
          : data.PhoneNumber,
      ShippingDetails: {
        Phone:
          data.PhoneNumber === ""
            ? props.userData?.phoneNumber
            : data.PhoneNumber,
        Street:
          data.ShippingStreet === ""
            ? props.userData?.shippingDetails.street
            : data.ShippingStreet,
        ZipCode:
          data.ShippingZipCode === ""
            ? props.userData?.shippingDetails.zipCode
            : data.ShippingZipCode,
        City:
          data.ShippingCity === ""
            ? props.userData?.shippingDetails.city
            : data.ShippingCity,
        CountryCode: "RO",
        State:
          data.ShippingState === ""
            ? props.userData?.shippingDetails.state
            : data.ShippingState,
      },
      BillingDetails: {
        Street:
          data.BillingStreet === ""
            ? props.userData?.billingDetails.street
            : data.BillingStreet,
        ZipCode:
          data.BillingZipCode === ""
            ? props.userData?.billingDetails.zipCode
            : data.BillingZipCode,
        City:
          data.BillingCity === ""
            ? props.userData?.billingDetails.city
            : data.BillingCity,
        CountryCode: "RO",
        State:
          data.BillingState === ""
            ? props.userData?.billingDetails.state
            : data.BillingState,
      },
    };

    currentUser?.getIdToken().then((token) => {
      axios
        .put(import.meta.env.VITE_API_URL + "/user", user, {
          params: {
            id: props.userData?.customer,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          Swal.fire({
            title: "Succes!",
            icon: "success",
            text: "Datele de livrare/facturare au fost modificate !",
          });
        })
        .catch(() => {
          Swal.fire({
            title: "Oops!",
            icon: "error",
            text: "A aparut o eroare, incercati mai tarziu",
          });
        });
    });
  };
  return (
    <div className="2xl:p-16 p-8 bg-white rounded-xl text-black my-6 md:my-0">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" mb-5 w-full">
          <span className="text-2xl font-thin w-full text-center lg:text-start">
            Detalii Livrare
          </span>
        </div>
        <div className="flex lg:grid grid-cols-3 flex-col justify-center items-center">
          <div className="w-full md:max-w-sm lg:max-w-10 col-span-1">
            <Input
              {...register("ShippingState")}
              className="px-2 lg:max-w-48 "
              variant="static"
              label="Judet"
              color="black"
              placeholder={props.userData?.shippingDetails.state}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <div className="my-4 lg:my-0 w-full md:max-w-sm lg:max-w-12 col-span-1">
            <Input
              {...register("ShippingCity")}
              className="px-2 lg:max-w-48 "
              variant="static"
              label="Oras"
              color="black"
              placeholder={props.userData?.shippingDetails.city}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <div className="w-full md:max-w-sm lg:max-w-12 col-span-1">
            <Input
              {...register("ShippingZipCode")}
              className="px-2 lg:max-w-48 "
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
        <div className="flex lg:grid grid-cols-3 flex-col justify-center items-center my-6">
          <div className=" mb-4 lg:mb-0 w-full md:max-w-sm lg:max-w-12 col-span-1">
            <Input
              {...register("PhoneNumber")}
              className="px-2 lg:max-w-48"
              variant="static"
              label="Telefon"
              color="black"
              placeholder={props.userData?.shippingDetails.phone}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <div className="w-full md:max-w-sm col-span-2">
            <Input
              {...register("ShippingStreet")}
              className="px-2"
              variant="static"
              label="Adresa"
              color="black"
              placeholder={props.userData?.shippingDetails.street}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
        </div>
        <div className=" mb-5 w-full mt-6">
          <span className="text-2xl font-thin w-full text-start">
            Detalii Facturare
          </span>
        </div>
        <div className="flex lg:grid grid-cols-3 flex-col justify-center items-center">
          <div className="w-full md:max-w-sm lg:max-w-10 col-span-1">
            <Input
              {...register("BillingState")}
              className="px-2 lg:max-w-48 "
              variant="static"
              label="Judet"
              color="black"
              placeholder={props.userData?.billingDetails.state}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <div className="my-4 lg:my-0 w-full md:max-w-sm lg:max-w-12 col-span-1">
            <Input
              {...register("BillingCity")}
              className="px-2 lg:max-w-48 "
              variant="static"
              label="Oras"
              color="black"
              placeholder={props.userData?.billingDetails.city}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <div className="w-full md:max-w-sm lg:max-w-12 col-span-1">
            <Input
              {...register("BillingZipCode")}
              className="px-2 lg:max-w-48 "
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
        <div className="flex lg:grid grid-cols-3 flex-col justify-center items-center my-6">
          <div className="w-full md:max-w-sm col-span-2">
            <Input
              {...register("BillingStreet")}
              className="px-2"
              variant="static"
              label="Adresa"
              color="black"
              placeholder={props.userData?.billingDetails.street}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
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
