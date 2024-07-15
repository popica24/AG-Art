type Props = {
  label: string;
  id: string;
  placeholder: string;
  type: "text" | "password" | "email";
  register: any;
};

const FormInput = (props: Props) => {
  return (
    <div className="w-1/2">
      <label
        className="block text-gray-700 text-sm font-bold my-2"
        htmlFor={props.id}
      >
        {props.label}
      </label>
      <input
        {...props.register}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default FormInput;
