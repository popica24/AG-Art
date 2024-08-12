import { User } from "firebase/auth";
import { UserData } from "../../../Utils/types";
import { useState } from "react";
import { Button } from "@material-tailwind/react";

type Props = {
	currentUser: User | null;
	userData: UserData | null;
}

const ContactManager = (props:Props) => {
	console.log(props);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
  };
  return (
    <div className="lg:p-16 p-8 bg-white rounded-xl text-black my-6 md:my-0">
      <div className="flex flex-col">
        <span className="text-2xl font-thin w-full lg:text-start mb-8">
          Formular de contact
        </span>
        <div className="flex items-center justify-center">
          <div className="mx-auto w-full">
            <form
              onSubmit={handleSubmit}
              action="https://formbold.com/s/FORM_ID"
              method="POST"
              className="w-full"
            >
              <div className="mb-5">
                <label
                  htmlFor="subject"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Subiectul discutiei
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder="Enter your subject"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="message"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Mesaj
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  name="message"
                  id="message"
                  placeholder="Type your message"
                  className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                ></textarea>
              </div>
              <div className="flex items-center justify-center">
                <Button
                  type="submit"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Trimite mesaj
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactManager;
