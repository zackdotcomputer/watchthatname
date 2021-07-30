import React, { ForwardedRef } from "react";
import Row from "./Row";

const LoadMoreRow = React.forwardRef(
  (
    {
      onLoadMore,
      isLoading
    }: {
      onLoadMore?: VoidFunction;
      isLoading?: boolean;
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    if (isLoading) {
      return (
        <Row className="justify-center bg-blue-200" ref={ref}>
          <span className="italic text:gray-800">Loading...</span>
        </Row>
      );
    } else {
      return (
        <button onClick={onLoadMore}>
          <Row className="hover:bg-blue-50 cursor-pointer justify-center" ref={ref}>
            <span className="link-style font-bold">Load More</span>
          </Row>
        </button>
      );
    }
  }
);

export default LoadMoreRow;
