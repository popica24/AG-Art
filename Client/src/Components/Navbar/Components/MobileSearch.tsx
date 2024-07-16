import React, { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { createSearchParams, useNavigate } from "react-router-dom";

type Props = {
  closeSearch: () => void;
};

const MobileSearch = (props: Props) => {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        props.closeSearch();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchend", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [props]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === "" || value.trim() === "") return;
    navigate({
      pathname: "/filter",
      search: `?${createSearchParams({
        keywords: value.trim(),
      })}`,
    });
    props.closeSearch();
    inputRef.current?.blur();
  };
  return (
    <div
      data-aos="fade-down"
      ref={containerRef}
      className="fixed top-0 left-0 w-full p-6 text-[#616161]"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full p-4 max-w-sm mx-auto flex justify-center items-center"
      >
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          className="w-full text-black p-1 ps-3 rounded-s-xl focus:outline-none focus:border-none"
        />
        <button
          type="submit"
          className="bg-white border-l border-[#c7c7c7] p-2 w-[40px] rounded-e-xl max-w-sm"
        >
          <BiSearch />
        </button>
      </form>
    </div>
  );
};

export default MobileSearch;
