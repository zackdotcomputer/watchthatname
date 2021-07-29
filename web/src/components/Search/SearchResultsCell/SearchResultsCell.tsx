import type { Domain, SearchResultsQuery } from "types/graphql";
import { CellSuccessProps, CellFailureProps, useMutation } from "@redwoodjs/web";
import ResultActionButton from "./ResultActionButton";
import React, { useCallback } from "react";
import FavoriteButton from "./FavoriteButton";
import { useAuth } from "@redwoodjs/auth";

export const QUERY = gql`
  query SearchResultsQuery($input: SearchQueryInput!, $page: Int) {
    search(input: $input, page: $page) {
      id
      domain
      desiredDomain

      available
      definitive

      favorited

      price {
        currency
        price
      }
    }
  }
`;

const SET_FAVORITED_MUTATION = gql`
  mutation SetWishdomainMutation($input: SetWishInput!) {
    setWishdomain(input: $input) {
      id
      desiredDomain
      favorited
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: "red" }}>Error: {error.message}</div>
);

export const Success = (searchResults: CellSuccessProps<SearchResultsQuery>) => {
  const [setWish] = useMutation(SET_FAVORITED_MUTATION, {
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY, variables: searchResults.variables }],
    awaitRefetchQueries: true
  });

  const { isAuthenticated, loading, logIn } = useAuth();

  const onAttemptFavorite = useCallback(
    (item: Domain) => {
      if (loading) {
        return;
      }
      if (isAuthenticated) {
        const nowFave = !(item.favorited ?? false);

        setWish({
          variables: {
            input: {
              domain: item.domain,
              desiredDomain: item.desiredDomain,
              favorited: nowFave
            }
          },
          optimisticResponse: {
            setWishdomain: {
              id: item.domain,
              __typename: "Domain",
              desiredDomain: item.desiredDomain,
              favorited: nowFave
            }
          }
        });
      } else {
        logIn();
      }
    },
    [loading, isAuthenticated, logIn, setWish]
  );

  return (
    <table>
      {searchResults.search.map((item) => {
        const boldedIndex = item.desiredDomain.indexOf(item.domain);
        const unbolded = boldedIndex > 0 ? item.desiredDomain.substring(0, boldedIndex) : "";
        return (
          <tr key={item.domain}>
            <td>
              {unbolded}
              <strong>{item.domain}</strong>
            </td>
            <td>
              <ResultActionButton available={item.available} price={item.price} />
            </td>
            <td>
              <FavoriteButton
                isOn={item.favorited ?? false}
                onClick={() => onAttemptFavorite(item)}
              />
            </td>
          </tr>
        );
      })}
    </table>
  );
};
