import { Button, Input } from "@material-tailwind/react";
import { UserData } from "../../../Utils/types";
import { User } from "firebase/auth";
type Props = {
  userData: UserData | null;
  currentUser: User | null | undefined;
};

const AccountSettings = (props: Props) => {
  if (
    props.currentUser == null ||
    props.currentUser == undefined ||
    props.userData == null
  )
    return <></>;
  return (
    <div className="p-16 bg-white rounded-xl text-black my-6 md:my-0">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col md:flex-row w-full justify-evenly">
          <div className="max-w-lg mb-6 md:mb-0">
            <Input
              className="w-full"
              variant="static"
              label="Nume"
              placeholder={props.userData?.firstName}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <div className="max-w-lg">
            <Input
              className="w-full"
              variant="static"
              label="Prenume"
              placeholder={props.userData?.lastName}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full justify-evenly my-8">
          <div className="max-w-lg">
            <Input
              className="w-full"
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
              className="w-full"
              variant="static"
              label="Nume"
              placeholder={props.currentUser.email}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
        </div>
        <span className="text-sm text-start px-8 my-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quos
          distinctio repellat sequi dolore voluptatibus magni obcaecati placeat
          quo sed voluptatum beatae temporibus tempore error animi suscipit
          libero, explicabo et. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Possimus quos distinctio repellat sequi dolore
          voluptatibus magni obcaecati placeat quo sed voluptatum beatae
          temporibus tempore error animi suscipit libero, explicabo et.
        </span>
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

export default AccountSettings;
