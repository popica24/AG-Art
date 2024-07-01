import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { createSearchParams, useNavigate } from "react-router-dom";

const MobileSearch = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === "" || value.trim() === "") return;
    navigate({
      pathname: "/filter",
      search: `?${createSearchParams({
        keywords: value.trim(),
      })}`,
    });
    window.location.reload();
    setValue("");
  };
  return (
    <form
      className="w-full max-w-sm mb-3"
      onSubmit={handleSubmit}
      method="POST"
    >
      <div className="flex items-center border-b border-[#F7EDE3] py-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Search..."
          aria-label="Full name"
        />
        <button
          className="flex-shrink-0 border-[#f7ede300] bg-[#f7ede3b7] hover:bg-[#f7ede3b7]  text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
        >
          <CiSearch />
        </button>
      </div>
    </form>
  );
};

export default MobileSearch;
