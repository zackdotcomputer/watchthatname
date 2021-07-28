import type { EditWishdomainById } from "types/graphql";

import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";
import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/toast";
import { navigate, routes } from "@redwoodjs/router";

import WishdomainForm from "src/components/Wishdomain/WishdomainForm";

export const QUERY = gql`
  query EditWishdomainById($id: String!) {
    wishdomain: wishdomain(id: $id) {
      id
      domain
      createdAt
    }
  }
`;
const UPDATE_WISHDOMAIN_MUTATION = gql`
  mutation UpdateWishdomainMutation($id: String!, $input: UpdateWishdomainInput!) {
    updateWishdomain(id: $id, input: $input) {
      id
      domain
      createdAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: "red" }}>Error: {error.message}</div>
);

export const Success = ({ wishdomain }: CellSuccessProps<EditWishdomainById>) => {
  const [updateWishdomain, { loading, error }] = useMutation(UPDATE_WISHDOMAIN_MUTATION, {
    onCompleted: () => {
      toast.success("Wishdomain updated");
      navigate(routes.wishdomains());
    }
  });

  const onSave = (input, id) => {
    updateWishdomain({ variables: { id, input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Wishdomain {wishdomain.id}</h2>
      </header>
      <div className="rw-segment-main">
        <WishdomainForm wishdomain={wishdomain} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  );
};
