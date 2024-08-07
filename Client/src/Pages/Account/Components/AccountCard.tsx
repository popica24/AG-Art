import { signOut } from "firebase/auth";
import { auth } from "../../../Utils/firebase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

type Props = {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined | null;
};

const AccountCard = (props: Props) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Swal.fire({
      title: "Ești sigur?",
      icon: "warning",
      text: "Veți fi delogat din contul dvs. Continuați?",
      showCancelButton: true,
      cancelButtonText: "Renunță",
      confirmButtonText: "Continuă",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await signOut(auth);
        navigate("/");
      }
    });
  };
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
        <span
          className="text-sm text-red-500 mt-3 border-b hover:border-b-red-500 cursor-pointer"
          onClick={handleLogout}
        >
          Iesi din cont
        </span>
      </div>
    </div>
  );
};

export default AccountCard;
