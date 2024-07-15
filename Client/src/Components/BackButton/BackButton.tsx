import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const BackButton = () => {
  return (
    <Link
      to={"/"}
      className="bg-[#F7F0E0] inline-flex items-center px-6 py-0.5 rounded-lg"
    >
      <IoIosArrowBack />
      Inapoi
    </Link>
  );
};

export default BackButton;
