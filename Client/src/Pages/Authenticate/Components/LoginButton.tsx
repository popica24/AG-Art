const LoginButton = (props: { text: string }) => {
  return (
    <div className="px-6 sm:px-0 max-w-sm">
      <button
        type="submit"
        className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
      >
        {props.text}
      </button>
    </div>
  );
};

export default LoginButton;
