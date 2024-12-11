import { Suspense } from "react";
import SearchResults from "../../components/SearchResults";

export default function SearchPage({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const query = searchParams.query;

  return (
    <div>
      <h1 className=" text-cyan-200">Search Page</h1>
      <Suspense fallback={<div className=" text-cyan-200">Loading...</div>}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
}
