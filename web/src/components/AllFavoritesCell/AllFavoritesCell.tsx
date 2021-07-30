import type { Domain, FavoritesQuery } from "types/graphql";
import { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";
import React, { useCallback, useEffect, useRef, useState } from "react";
import LoadMoreRow from "../LoadMoreRow";
import useSetFavoriteMutation from "src/useSetFavoriteMutation";
import { useAuth } from "@redwoodjs/auth";
import SearchResultRow from "../Search/SearchResultRow/SearchResultRow";
import { Link, routes } from "@redwoodjs/router";
import Row from "../Row";

const RESULTS_PER_PAGE = 20;

export const QUERY = gql`
  query FavoritesQuery($offset: Int, $limit: Int) {
    favorites(offset: $offset, limit: $limit) {
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
    <div className="w-full h-12 flex flex-row transition-colors items-center space-x-2 odd:bg-gray-50 px-4 justify-center">
      No Results Found.
    </div>
  </article>
);

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: "red" }}>Error: {error.message}</div>
);

export const Success = (favoriteResults: CellSuccessProps<FavoritesQuery>) => {
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
    const res: Pick<QueryOperationResult<FavoritesQuery>, "data"> = await favoriteResults.fetchMore(
      {
        variables: {
          offset: favoriteResults.favorites.length,
          limit: RESULTS_PER_PAGE
        }
      }
    );
    if (res.data.favorites.length < 1) {
      setHasMore(false);
    }
    setMoreLoading(false);
  }, [favoriteResults, moreLoading, hasMore]);

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
      {favoriteResults.favorites.map((item) => {
        const buyDestination = `https://godaddy.com/domainsearch/find?checkAvail=1&domainToCheck=${item.domain}`;
        return (
          <SearchResultRow
            key={item.domain}
            item={item}
            destination={routes.domainDetails({
              domain: encodeURIComponent(item.desiredDomain ?? item.domain)
            })}
            onFavorite={onAttemptFavorite}
            buyDestination={buyDestination}
          />
        );
      })}
      {hasMore ? (
        <LoadMoreRow
          isLoading={moreLoading || favoriteResults.loading}
          ref={loaderRef}
          onLoadMore={doFetchMore}
        />
      ) : (
        <Row className="justify-center italic">
          That&rsquo;s it!{" "}
          <Link to={routes.search()} className="link-style ml-2">
            Go find some more...
          </Link>
        </Row>
      )}
    </article>
  );
};
