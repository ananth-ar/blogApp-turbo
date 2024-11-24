"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <form className="flex m-2 ml-5" onSubmit={handleSubmit}>
      <label
        className="input flex items-center gap-2 bg-gray-100 dark:bg-muted text-base-content rounded-[1.5rem] 
           focus-within:outline-none focus-within:ring-0 focus-within:border-transparent h-[2.5rem]"
      >
        <input
          className="bg-transparent border-none focus:ring-0 focus:outline-none w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
    </form>
  );
};

export default SearchBar;
