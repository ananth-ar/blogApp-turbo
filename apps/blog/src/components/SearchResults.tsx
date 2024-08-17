import { use } from "react";

async function fetchSearchResults(query: string) {
  const res = await fetch(`http://localhost:3000/api/search?query=${query}`);
  const data = await res.json();
  return data;
}

export default function SearchResults({ query }: { query: string }) {
  const results = use(fetchSearchResults(query));

  return (
    <div>
      <h2 className=" text-cyan-200">Results for: {query}</h2>
      <ul>
        {results &&
          results.users.map((result: any) => (
            <li className=" text-cyan-200" key={result.id}>
              name: {result.name}
            </li>
          ))}
      </ul>
      <ul>
        {results &&
          results.posts.map((result: any) => (
            <li className=" text-cyan-200" key={result.id}>
              post title: {result.title}
            </li>
          ))}
      </ul>
    </div>
  );
}
