type Props = {
  text: string;
  id: string;
  label: string;
};

const Databox = (props: Props) => {
  return (
    <div className="w-full">
      <label
        htmlFor={props.id}
        className="mb-2 block text-sm font-medium text-white"
      >
        {props.label}
      </label>
      <span
        id={props.id}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-black focus:border-primary-500 focus:ring-primary-500"
      >
        {props.text}
      </span>
    </div>
  );
};

export default Databox;
