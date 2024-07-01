import { useEffect, useRef, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

type Props = {
  closeSearch: () => void;
};

const Search = (props: Props) => {
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
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        props.closeSearch();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
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
  };

  return (
    <div
      ref={containerRef}
      className="bg-black fixed lg:w-[790px] w-[595px] left-1/2 -translate-x-[56%] -translate-y-[46%] lg:-translate-y-[50%] h-[82px] py-[1.5em] px-[1em]"
    >
      <form
        action="POST"
        onSubmit={handleSubmit}
        className="w-full h-full rounded-lg text-black font-medium px-2"
      >
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          data-aos="flip-down"
          type="text"
          className="w-full h-full rounded-lg text-black font-medium px-2"
        />
      </form>
    </div>
  );
};

export default Search;
