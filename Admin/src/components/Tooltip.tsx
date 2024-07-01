type Props = {
  text: string;
  comment: string;
};
const Tooltip = (props: Props) => {
  return (
    <div className="relative inline-block">
      <div className="cursor-pointer">{props.text}</div>
      <div className="invisible w-[200px] bg-black text-white text-center rounded-md p-1 absolute z-10 bottom-[125%] left-[50%] ml-[-100px] opacity-0 transition-[opacity] hover:visible hover:opacity-[100%]"></div>
    </div>
  );
};

export default Tooltip;
