import React, { useMemo } from "react";
import SearchForm from "src/components/Search/SearchForm/SearchForm";
import SearchResultsCell from "src/components/Search/SearchResultsCell";

type SearchPageProps = {
  query?: string;
};

const SearchPage = ({ query }: SearchPageProps) => {
  const decoded = useMemo(() => query && decodeURIComponent(query), [query]);

  return (
    <>
      <section>
        <SearchForm initialValue={decoded} />
      </section>
      <section className="mt-4">
        {(decoded ?? "").length > 0 && <SearchResultsCell input={{ query: decoded }} />}
      </section>
    </>
  );
};

export default SearchPage;
