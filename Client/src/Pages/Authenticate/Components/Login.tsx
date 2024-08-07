import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
type Inputs = {
  email: string;
  password: string;
};
type Props = {
  setRegister: () => void;
  close: () => void;
};
const Login = (props: Props) => {
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (result.user) {
        props.close();
        Swal.fire({
          title: "Succes",
          text: "Te-ai autentificat cu succes",
          icon: "success",
        });
      }
    } catch (error: any) {
      if (error.code === "auth/invalid-credential") {
        Swal.fire({
          title: "Oops",
          text: "Email sau parola incorecte. Va rugam sa incercati din nou.",
          icon: "error",
        });
        setLoading(false);
      }
    }
  };
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      auth.languageCode = "RO";
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        props.close();
        Swal.fire({
          title: "Succes",
          text: "Te-ai autentificat cu succes",
          icon: "success",
        });
      }
    } catch (error: any) {
      Swal.fire({
        title: "Oops",
        text: "A aparut o eroare.",
        icon: "error",
      });
    }
  };
  return (
    <div
      id="login-popup"
      className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex"
    >
      <div className="relative p-4 w-full max-w-md h-auto md:h-auto">
        <div className="relative bg-white rounded-lg shadow">
          <button
            onClick={props.close}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="#c6c7c7"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close popup</span>
          </button>

          <div className="p-5">
            <h3 className="text-2xl mb-0.5 font-medium"></h3>
            <p className="mb-4 text-sm font-normal text-gray-800"></p>
            <div className="text-center">
              <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                Intră în cont
              </p>
            </div>{" "}
            <div className="mt-7 flex flex-col gap-2">
              <button
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
                onClick={loginWithGoogle}
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-[18px] w-[18px] "
                />
                Continua cu Google
              </button>
            </div>
            <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
              <div className="h-px w-full bg-slate-200"></div>
              SAU
              <div className="h-px w-full bg-slate-200"></div>
            </div>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="email" className="sr-only">
                Adresa Email
              </label>
              <input
                disabled={loading}
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Adresa Email"
                {...register("email")}
              />
              <label htmlFor="password" className="sr-only">
                Parola
              </label>
              <input
                disabled={loading}
                type="password"
                autoComplete="current-password"
                required
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Parola"
                {...register("password")}
              />
              <p className="mb-3 mt-2 text-sm text-gray-500">
                <a
                  href="/forgot-password"
                  className="text-blue-800 hover:text-blue-600"
                >
                  Resetează parola?
                </a>
              </p>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
              >
                {loading ? (
                  <img src="hourglass.gif" className="h-[20px]" alt="" />
                ) : (
                  "Autentificare"
                )}
              </button>
            </form>
            <div className="mt-6 text-center text-sm text-slate-600">
              Nu ai cont ?{" "}
              <span
                className="font-medium text-[#4285f4] cursor-pointer"
                onClick={props.setRegister}
              >
                Înregistrează-te
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
