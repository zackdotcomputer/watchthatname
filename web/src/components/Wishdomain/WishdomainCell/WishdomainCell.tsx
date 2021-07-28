import type { FindWishdomainById } from "types/graphql";
import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";

import Wishdomain from "src/components/Wishdomain/Wishdomain";

export const QUERY = gql`
  query FindWishdomainById($id: String!) {
    wishdomain: wishdomain(id: $id) {
      id
      domain
      createdAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Wishdomain not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: "red" }}>Error: {error.message}</div>
);

export const Success = ({ wishdomain }: CellSuccessProps<FindWishdomainById>) => {
  return <Wishdomain wishdomain={wishdomain} />;
};
