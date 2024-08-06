import { Button, Input } from "@material-tailwind/react";
import { UserData } from "../../../Utils/types";
import { User } from "firebase/auth";
import { useState } from "react";
import { useAuth } from "../../../Contexts/AuthContext";
import axios from "axios";
type Props = {
  userData: UserData | null;
  currentUser: User | null | undefined;
};

const AccountSettings = (props: Props) => {
  const [firstName, setFirstName] = useState(props.userData?.firstName);
  const [lastName, setLastName] = useState(props.userData?.lastName);
  const { currentUser } = useAuth();
  const updateUser = async () => {
    const user = {
      FirstName: firstName,
      LastName: lastName,
      PhoneNumber: props.userData?.phoneNumber,
      ShippingDetails: {
        Phone: props.userData?.shippingDetails.phone,
        Street: props.userData?.shippingDetails.street,
        ZipCode: props.userData?.shippingDetails.zipCode,
        City: props.userData?.shippingDetails.city,
        CountryCode: "RO",
        State: props.userData?.shippingDetails.state,
      },
      BillingDetails: {
        Street: props.userData?.billingDetails.street,
        ZipCode: props.userData?.billingDetails.zipCode,
        City: props.userData?.billingDetails.city,
        CountryCode: "RO",
        State: props.userData?.billingDetails.state,
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
  };
  if (
    props.currentUser == null ||
    props.userData == null ||
    props.currentUser.email == null
  ) {
    return <></>;
  }
  return (
    <div className="lg:p-16 p-8 bg-white rounded-xl text-black my-6 md:my-0">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col md:flex-row w-full justify-evenly">
          <div className="max-w-lg mb-6 md:mb-0">
            <Input
              className="w-full px-2"
              variant="static"
              label="Nume"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={props.userData.firstName}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <div className="max-w-lg">
            <Input
              className="w-full px-2"
              variant="static"
              label="Prenume"
              onChange={(e) => setLastName(e.target.value)}
              placeholder={props.userData.lastName}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full justify-evenly my-8">
          <div className="max-w-lg">
            <Input
              disabled
              className="w-full px-2"
              variant="static"
              label="Email"
              placeholder={props.currentUser?.email}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <div className="max-w-lg hidden md:block md:invisible">
            <Input
              disabled
              className="w-full"
              variant="static"
              label="Nume"
              placeholder={props.userData?.lastName}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
        </div>
        <div className="flex flex-row-reverse w-full justify-evenly">
          <div className="md:max-w-lg">
            <Button
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Schimba Parola
            </Button>
          </div>
          <div className="max-w-lg hidden md:block md:invisible">
            <Input
              disabled
              className="w-full"
              variant="static"
              label="Nume"
              placeholder={props.currentUser?.email}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
        </div>
        <span className="text-xs md:text-sm text-start md:px-8 my-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quos
          distinctio repellat sequi dolore voluptatibus magni obcaecati placeat
          quo sed voluptatum beatae temporibus tempore error animi suscipit
          libero, explicabo et. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Possimus quos distinctio repellat sequi dolore
          voluptatibus magni obcaecati placeat quo sed voluptatum beatae
          temporibus tempore error animi suscipit libero, explicabo et.
        </span>
        <div className="flex flex-row items-center justify-center w-full px-8">
          <Button
            onClick={updateUser}
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

export default AccountSettings;
