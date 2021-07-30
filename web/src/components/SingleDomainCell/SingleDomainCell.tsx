import type { Domain, FindOneQuery } from "types/graphql";
import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";
import React, { useCallback } from "react";
import LoadMoreRow from "../LoadMoreRow";
import SearchResultRow from "../Search/SearchResultRow/SearchResultRow";
import { Link, routes } from "@redwoodjs/router";
import { useAuth } from "@redwoodjs/auth";
import useSetFavoriteMutation from "src/useSetFavoriteMutation";
import SingleDomainContents from "./SingleDomainContents";

export const QUERY = gql`
  query FindOneQuery($domain: String!) {
    findOne(domain: $domain) {
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

      whois
    }
  }
`;

export const Loading = () => (
  <article className="flex flex-col items-stretch justify-start max-w-xl mx-auto">
    <LoadMoreRow isLoading={true} />
  </article>
);

export const Empty = () => (
  <article className="border rounded bg-gray-100 border-solid border-gray-200 p-6 px-8 md:max-w-md mx-auto text-center flex flex-col space-y-4 items-center">
    <img className="" src="/binoculars-small.png" alt="Binoculars" />
    <h1 className="text-4xl font-bold">
      <span>404 Domain Not Found</span>
    </h1>
    <p className="leading-loose">
      Sorry but that domain has gone missing.
      <br />
      We&rsquo;ll keep an eye out for it.
    </p>
    <Link className="link-style" to={routes.search()}>
      Return to Search
    </Link>
  </article>
);

export const Failure = ({ error }: CellFailureProps) => {
  console.warn(error);
  return <Empty />;
};

export const Success = (success: CellSuccessProps<FindOneQuery>) => {
  const [setWish] = useSetFavoriteMutation();

  const { isAuthenticated, loading, logIn } = useAuth();
  const item = success.findOne;

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

  if (!item) {
    return <Empty />;
  }

  const buyDestination = `https://godaddy.com/domainsearch/find?checkAvail=1&domainToCheck=${item.domain}`;

  return (
    <>
      <article className="container mx-auto rounded border border-solid border-gray-200">
        <SearchResultRow
          key={item.domain}
          item={item}
          onFavorite={onAttemptFavorite}
          buyDestination={buyDestination}
        />
        <SingleDomainContents item={item} />
      </article>
    </>
  );
};
