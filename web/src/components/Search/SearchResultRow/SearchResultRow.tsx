import { Link } from "@redwoodjs/router";
import classNames from "classnames";
import React from "react";
import { usePlausible } from "src/PlausibleProvider";
import { Domain } from "types/graphql";
import FavoriteButton from "./FavoriteButton";
import ResultActionButton from "./ResultActionButton";

type DomainBlock = (domain: Domain) => void;

interface Props {
  item: Domain;
  onFavorite?: DomainBlock;
  buyDestination?: string;
  destination?: string;
}

const SearchResultTitle = ({ item, destination }: Props) => {
  const boldedIndex = item.desiredDomain.indexOf(item.domain);
  const unbolded = boldedIndex > 0 ? item.desiredDomain.substring(0, boldedIndex) : "";

  return (
    <div className="flex-grow">
      <span className={classNames({ "link-style": destination })}>
        {unbolded}
        <strong>{item.domain}</strong>
      </span>
    </div>
  );
};

const SearchResultRow = ({ item, onFavorite, buyDestination, destination }: Props) => {
  const { trackEvent } = usePlausible();

  return (
    <div
      key={item.domain}
      className="w-full h-12 flex flex-row hover:bg-blue-50 transition-colors items-center space-x-2 odd:bg-gray-50 px-4"
    >
      {destination ? (
        <Link to={destination}>
          <SearchResultTitle item={item} destination={destination} />
        </Link>
      ) : (
        <SearchResultTitle item={item} destination={destination} />
      )}
      <div className="flex justify-center items-center">
        <ResultActionButton
          available={item.available}
          price={item.price}
          destination={buyDestination}
        />
      </div>
      <div className="w-8 ml-12 flex-grow-0 flex justify-center items-center">
        <FavoriteButton
          isOn={item.favorited ?? false}
          onClick={() => {
            trackEvent(item.favorited ? "favorite-unset" : "favorite-set");
            onFavorite?.(item);
          }}
        />
      </div>
    </div>
  );
};

export default SearchResultRow;
