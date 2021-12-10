import type { Domain, SearchResultsQuery } from "types/graphql";
import { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@redwoodjs/auth";
import SearchResultRow from "../SearchResultRow/SearchResultRow";
import LoadMoreRow from "../../LoadMoreRow";
import useSetFavoriteMutation from "src/useSetFavoriteMutation";
import Row from "src/components/Row";
import { routes } from "@redwoodjs/router";

const RESULTS_PER_PAGE = 20;

export const QUERY = gql`
  query SearchResultsQuery($input: SearchQueryInput!, $offset: Int, $limit: Int) {
    search(input: $input, offset: $offset, limit: $limit) {
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

export const Loading = () => (
  <article className="flex flex-col items-stretch justify-start max-w-xl mx-auto">
    <LoadMoreRow isLoading={true} />
  </article>
);

export const Empty = () => (
  <article className="flex flex-col items-stretch justify-start max-w-xl mx-auto">
    <Row className="justify-center">No Results Found.</Row>
  </article>
);

export const Failure = ({ error }: CellFailureProps) => (
  <Row className="justify-center text-red-700">Error! {error.message}</Row>
);

export const Success = (searchResults: CellSuccessProps<SearchResultsQuery>) => {
  const [setWish] = useSetFavoriteMutation();

  const { isAuthenticated, loading, logIn } = useAuth();

  const loaderRef = useRef<HTMLDivElement>(null);

  const [moreLoading, setMoreLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const doFetchMore = useCallback(async () => {
    if (moreLoading || !hasMore) {
      return;
    }

    setMoreLoading(true);
    const res: Pick<
      QueryOperationResult<SearchResultsQuery>,
      "data"
    > = await searchResults.fetchMore({
      variables: {
        ...searchResults.variables,
        offset: searchResults.search.length,
        limit: RESULTS_PER_PAGE
      }
    });
    if (res.data.search.length < 1) {
      setHasMore(false);
    }
    setMoreLoading(false);
  }, [searchResults, moreLoading, hasMore]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting) {
        doFetchMore();
      }
    },
    [doFetchMore]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current && hasMore) {
      const current = loaderRef.current;
      observer.observe(current);
      return () => {
        observer.unobserve(current);
      };
    }
    return () => {};
  }, [handleObserver, hasMore]);

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
    <article className="flex flex-col items-stretch justify-start max-w-xl mx-auto">
      {searchResults.search.map((item) => {
        const buyDestination = `https://godaddy.com/domainsearch/find?checkAvail=1&domainToCheck=${item.domain}`;
        return (
          <SearchResultRow
            key={item.domain}
            destination={routes.domainDetails({
              domain: encodeURIComponent(item.desiredDomain ?? item.domain)
            })}
            item={item}
            onFavorite={onAttemptFavorite}
            buyDestination={buyDestination}
          />
        );
      })}
      {hasMore && (
        <LoadMoreRow
          isLoading={moreLoading}
          ref={loaderRef}
          onLoadMore={doFetchMore}
        />
      )}
    </article>
  );
};
