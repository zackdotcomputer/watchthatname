import AllFavoritesCell from "src/components/AllFavoritesCell";
import { useTrackPageview } from "src/PlausibleProvider";

const FavoritesPage = () => {
  useTrackPageview();
  return (
    <div className="flex flex-col justify-between flex-grow h-full">
      <section>
        <h1 className="text-center text-2xl font-bold mt-4 mb-6">Your Favorite Domains</h1>
        <AllFavoritesCell />
      </section>
    </div>
  );
};

export default FavoritesPage;
