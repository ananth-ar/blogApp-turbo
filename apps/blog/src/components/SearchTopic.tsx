"use client";

import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

const SearchTopic = ({
  setTopics,
}: {
  setTopics: Dispatch<SetStateAction<string[]>>;
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>([]);
  const [noResults, setNoResults] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (query.length > 1) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/getTopic?query=${query}`
          );
          const data = await response.json();
          console.log(" res dat", data);
          if (data.topic.length === 0) {
            console.log("no data");
            setNoResults(true);
            setResults([]);
          } else {
            console.log("data");
            setNoResults(false);
            setResults(data.topic);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleInputChange = (event: any) => {
    setQuery(event.target.value);
  };

  const handleAddTopic = (topic: string) => {
    setTopics((prevTopics) => [...prevTopics, topic]);
    setQuery("");
  };

  return (
    <div className="p-4">
      <input
        className="border-4 border-indigo-500/50 p-2 mb-2 w-full"
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      {noResults && query.length > 1 ? (
        <button
          className="bg-orange-300 py-2 px-4 rounded"
          onClick={() => handleAddTopic(query)}
        >
          Create new topic: {query}
        </button>
      ) : (
        <ul className="space-y-2">
          {results.map((item:any) => (
            <li key={item.id}>
              <button
                className="bg-emerald-300 py-2 px-4 rounded w-full text-left"
                onClick={() => handleAddTopic(item.topic)}
              >
                {item.topic}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchTopic;
