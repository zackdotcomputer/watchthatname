import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/toast";
import { navigate, routes } from "@redwoodjs/router";
import WishdomainForm from "src/components/Wishdomain/WishdomainForm";

const CREATE_WISHDOMAIN_MUTATION = gql`
  mutation CreateWishdomainMutation($input: CreateWishdomainInput!) {
    createWishdomain(input: $input) {
      id
    }
  }
`;

const NewWishdomain = () => {
  const [createWishdomain, { loading, error }] = useMutation(CREATE_WISHDOMAIN_MUTATION, {
    onCompleted: () => {
      toast.success("Wishdomain created");
      navigate(routes.wishdomains());
    }
  });

  const onSave = (input) => {
    createWishdomain({ variables: { input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Wishdomain</h2>
      </header>
      <div className="rw-segment-main">
        <WishdomainForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewWishdomain;
