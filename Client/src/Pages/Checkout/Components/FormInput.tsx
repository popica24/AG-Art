type Props = {
  label: string;
  name: string;
  id: string;
  placeholder: string;
  width: string;
};

const FormInput = (props: Props) => {
  return (
    <div className={`w-full md:${props.width} px-3 mb-6 md:mb-0`}>
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor={props.id}
      >
        {props.label}
      </label>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        id={props.id}
        name={props.name}
        type="text"
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default FormInput;
