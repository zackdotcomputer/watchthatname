import { faCreativeCommonsNc } from "@fortawesome/free-brands-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Domain } from "types/graphql";

type Props = Pick<Domain, "available" | "price"> & { destination?: string };

export default function ResultActionButton({ available, price, destination }: Props) {
  if (available) {
    return (
      <>
        <a
          href={destination}
          rel="nofollow noopener noreferrer"
          target="_blank"
          className="hover:text-blue-700 transition-colors"
        >
          <span className="text-sm font-semibold mr-2 opacity-80">
            {price.currency === "USD" && "$"}
            {(price.price / 1000000).toFixed(2)}
            {price.currency !== "USD" && price.currency}
          </span>
          <FontAwesomeIcon icon={faShoppingCart} />
        </a>
      </>
    );
  } else {
    return (
      <>
        <a
          href={destination}
          rel="nofollow noopener noreferrer"
          target="_blank"
          className="opacity-60 cursor-not-allowed"
        >
          <span className="mr-2 italic text-sm">n/a</span>
          <FontAwesomeIcon icon={faCreativeCommonsNc} />
        </a>
      </>
    );
  }
}
