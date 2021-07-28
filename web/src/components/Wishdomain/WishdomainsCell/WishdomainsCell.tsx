import type { FindWishdomains } from "types/graphql";
import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";

import { Link, routes } from "@redwoodjs/router";

import Wishdomains from "src/components/Wishdomain/Wishdomains";

export const QUERY = gql`
  query FindWishdomains {
    wishdomains {
      id
      domain
      createdAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {"No wishdomains yet. "}
      <Link to={routes.newWishdomain()} className="rw-link">
        {"Create one?"}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: "red" }}>Error: {error.message}</div>
);

export const Success = ({ wishdomains }: CellSuccessProps<FindWishdomains>) => {
  return <Wishdomains wishdomains={wishdomains} />;
};
