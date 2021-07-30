import { useMutation } from "@apollo/client";
import { SetWishdomainMutationVariables } from "types/graphql";

const SET_FAVORITED_MUTATION = gql`
  mutation SetWishdomainMutation($input: SetWishInput!) {
    setWishdomain(input: $input) {
      id
      desiredDomain
      favorited
    }
  }
`;

export default function useSetFavoriteMutation() {
  return useMutation(SET_FAVORITED_MUTATION, {
    awaitRefetchQueries: true,
    optimisticResponse: (vars: SetWishdomainMutationVariables) => ({
      setWishdomain: {
        id: vars.input.domain,
        __typename: "Domain",
        desiredDomain: vars.input.desiredDomain,
        favorited: vars.input.favorited
      }
    })
  });
}
