import { Link, routes } from "@redwoodjs/router";

const SearchPage = () => {
  return (
    <>
      <h1>SearchPage</h1>
      <p>
        Find me in <code>./web/src/pages/SearchPage/SearchPage.tsx</code>
      </p>
      <p>
        My default route is named <code>search</code>, link to me with `
        <Link to={routes.search()}>Search</Link>`
      </p>
    </>
  );
};

export default SearchPage;
