import classNames from "classnames";
import React, { ForwardedRef, ReactNode } from "react";

const Row = React.forwardRef(
  (
    { className, children }: { className?: string; children?: ReactNode },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const rowClasses =
      "w-full h-12 flex flex-row transition-colors items-center space-x-2 odd:bg-gray-50 px-4 justify-center";
    return (
      <div className={classNames(rowClasses, className)} ref={ref}>
        {children}
      </div>
    );
  }
);

export default Row;
