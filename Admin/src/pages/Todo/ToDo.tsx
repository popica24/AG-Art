import { useQuery } from "react-query";
import { useTodo } from "../../context/ToDoContext";

const ToDo = () => {
  const toDoRepository = useTodo();
  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`get-todos`],
    queryFn: () => {
      return toDoRepository?.getMany();
    },
  });
  if (
    isLoading ||
    error ||
    response == undefined ||
    response.data == undefined
  ) {
    return <>Loading...</>;
  }
  return (
    <div className="flex flex-col items-center bg-black text-white h-full min-h-screen">
      <h1 className="text-4xl font-thin my-8" data-aos="zoom-out">
        Comenzi de facut
      </h1>
      <div className="flex flex-row flex-wrap items-stretch justify-center">
        {response.data.map((t, i) => {
          return (
            <>
              <ToDoCard {...t} key={i} />
            </>
          );
        })}
      </div>
    </div>
  );
};

type ToDoCardProps = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  city: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  state: string;
  phone: string;
  clientName: string;
};

const ToDoCard = (props: ToDoCardProps) => {
  return (
    <div className="shadow m-4" data-aos="flip-right">
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-md w-full max-w-[20rem] p-8">
        <div className="relative pb-8 m-0 mb-8 overflow-hidden text-center text-gray-700 bg-transparent border-b rounded-none shadow-none bg-clip-border border-white/10">
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-white uppercase">
            {props.phone}
          </p>
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-white">
            {props.clientName}
          </p>
          <h2 className="flex justify-center gap-1 mt-6 font-sans antialiased font-normal tracking-normal text-white text-7xl">
            {props.price}
            <span className="mt-2 text-4xl">RON</span>
          </h2>
          <h3 className="flex justify-center gap-1 mt-6 font-sans antialiased font-normal tracking-normal text-white text-4xl">
            x{props.quantity}
          </h3>
          <h4 className="flex justify-center gap-1 mt-6 font-sans antialiased font-normal tracking-normal text-white text-sm text-center">
            De incasat {props.price * props.quantity} RON <br />{" "}
            {props.quantity} bucati x {props.price}RON
          </h4>
        </div>
        <div className="p-0">
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-4">
              <span className="p-1 border rounded-full border-white/20 bg-white/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  ></path>
                </svg>
              </span>
              <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                Tip lampa : {props.name}
              </p>
            </li>
            <li className="flex items-center gap-4">
              <span className="p-1 border rounded-full border-white/20 bg-white/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  ></path>
                </svg>
              </span>
              <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                Livrare : {props.state}, {props.city}, {props.addressLine1}
                {props.addressLine2}, {props.postalCode}
              </p>
            </li>
            <li className="flex items-center gap-4">
              <span className="p-1 border rounded-full border-white/20 bg-white/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  ></path>
                </svg>
              </span>
              <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                Nume client : {props.clientName}
              </p>
            </li>
            <li className="flex items-center gap-4">
              <span className="p-1 border rounded-full border-white/20 bg-white/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  ></path>
                </svg>
              </span>
              <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                Numar telefon client : {props.phone}
              </p>
            </li>
          </ul>
        </div>
        <div className="p-0 mt-12">
          <button
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg bg-white text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
            type="button"
          >
            Trimite spre livrare
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
