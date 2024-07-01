import { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

type Props = {
  handleClose: () => void;
  title: string;
  subtitle: string;
  children: ReactNode;
  wrapperClass?: string;
  width: string;
};
const defaultProps: Partial<Props> = {
  width: "w-[90%]",
};
const PopupContainer = (props: Props) => {
  return (
    <>
      {" "}
      <div className="fixed inset-0 bg-black z-10 popup-backdrop" />
      <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center h-full w-full popup-container z-30 opacity-1">
        <div
          className={`bg-white relative rounded-xl text-black py-3 px-6  z-30 ${props.wrapperClass} ${props.width}`}
        >
          <div className="absolute right-7 top-4">
            <IoMdClose
              size={"30px"}
              onClick={props.handleClose}
              className="cursor-pointer"
            />
          </div>

          <span className="text-3xl font-thin">AG-Art | {props.title}</span>
          <div className="flex flex-col items-start justify-start">
            <span className="text-2xl font-thin">{props.subtitle}</span>
          </div>

          {props.children}
        </div>
      </div>
    </>
  );
};
PopupContainer.defaultProps = defaultProps;
export default PopupContainer;
