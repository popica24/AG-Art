import { useState } from "react";
import NewsletterRepository from "../Services/NewsletterRepository";
import { IoCloseSharp } from "react-icons/io5";
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [hidden, setHidden] = useState(false);
  const handleSubmit = async () => {
    const newsletterRepository = new NewsletterRepository();
    await newsletterRepository.create(email);
  };

  return (
    <div
      className={`w-full py-7 text-white bg-[#000300] px-4 fixed bottom-0 z-30   ${
        hidden && "newsletter-hidden"
      }`}
      data-aos="fade-in"
      data-aos-duration="1000"
    >
      <div className="w-full flex justify-end items-end max-w-[1240px] mx-auto">
        <span className="cursor-pointer" onClick={() => setHidden(true)}>
          <IoCloseSharp size={"25px"} />
        </span>
      </div>
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3 relative">
        <div className="lg:col-span-2 my-4">
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
            PROPOZITIE CATCHY
          </h1>
          <p className="text-[#FBF3DE]">
            Abonează-te la newsletter-ul nostru și primește un cupon de reducere
            de 35%!
          </p>
        </div>
        <div className="my-4">
          <div className="flex flex-col sm:flex-row items-center justify-between w-full">
            <input
              className="p-3 flex w-full rounded-md text-black"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="bg-[#FBF3DE] text-black rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3 whitespace-nowrap"
              onClick={handleSubmit}
            >
              Abonează-mă!
            </button>
          </div>
          <p>
            Ne pasă de protecția datelor tale. Citește{" "}
            <span className="text-[#FBF3DE]">
              Politica noastră de Confidențialitate.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
