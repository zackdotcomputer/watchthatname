import { Link, routes } from "@redwoodjs/router";

const FavoritesPage = () => {
  return (
    <>
      <h1>FavoritesPage</h1>
      <p>
        Find me in <code>./web/src/pages/FavoritesPage/FavoritesPage.tsx</code>
      </p>
      <p>
        My default route is named <code>favorites</code>, link to me with `
        <Link to={routes.favorites()}>Favorites</Link>`
      </p>
    </>
  );
};

export default FavoritesPage;
