import { faCreativeCommonsNc } from "@fortawesome/free-brands-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Domain } from "types/graphql";

export default function ResultActionButton({
  available,
  price
}: Pick<Domain, "available" | "price">) {
  if (available) {
    return (
      <>
        {price.currency === "USD" && "$"}
        {(price.price / 1000000).toFixed(2)}
        {price.currency !== "USD" && price.currency}
        <button>
          <FontAwesomeIcon icon={faShoppingCart} />
        </button>
      </>
    );
  } else {
    return (
      <button disabled>
        <FontAwesomeIcon icon={faCreativeCommonsNc} />
      </button>
    );
  }
}
