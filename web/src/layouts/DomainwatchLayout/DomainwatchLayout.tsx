import classnames from "classnames";
import { Link, routes } from "@redwoodjs/router";
import React from "react";
import UserStateNavBit from "src/components/UserStateNavBit/UserStateNavBit";

type DomainwatchLayoutProps = {
  children: React.ReactNode;
  className?: string;
  hideBranding?: boolean;
};

const DomainwatchLayout = ({ children, hideBranding, className }: DomainwatchLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <header className="text-gray-600 body-font sticky">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          {hideBranding ? (
            <div />
          ) : (
            <Link
              to={routes.home()}
              className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            >
              <img
                src="/binoculars-small.png"
                className="w-14 h-10 p-1 object-contain object-center"
                alt="A pair of binoculars"
              />
              <span className="ml-3 text-xl">Domain Watch</span>
            </Link>
          )}
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link to={routes.search()} className="mr-5 hover:text-gray-900">
              <span role="img" aria-hidden>
                🔍
              </span>{" "}
              Search
            </Link>
            <Link to={routes.favorites()} className="mr-5 hover:text-gray-900">
              <span role="img" aria-hidden>
                ❤️
              </span>{" "}
              Favorites
            </Link>
            <UserStateNavBit />
          </nav>
        </div>
      </header>
      <main className={classnames("container flex-grow mx-auto", className)}>{children}</main>
      <footer className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row sm:space-x-2 flex-col">
          <p className="text-sm text-gray-500 sm:py-2 sm:mt-0 mt-4">
            Made 2021 by
            <a
              href="https://traveler.dev"
              className="text-gray-600 ml-1 link-style"
              rel="noopener noreferrer"
              target="_blank"
            >
              Traveler Dev Ltd
            </a>{" "}
            (England 13120175)
          </p>
          <p className="hidden sm:block">&bull;</p>
          <p className="text-sm text-gray-500 sm:py-2 sm:mt-0 mt-4">
            This site uses only necessary cookies
          </p>
          <p className="hidden sm:block">&bull;</p>
          <p className="text-sm text-gray-500 sm:py-2 sm:mt-0 mt-4">
            Binoculars Illustration by{" "}
            <a
              rel="noopener noreferrer"
              className="link-style"
              href="https://icons8.com/illustrations/author/5c07e68d82bcbc0092519bb6"
            >
              Icons 8
            </a>{" "}
            from{" "}
            <a
              rel="noopener noreferrer nofollow"
              className="link-style"
              href="https://icons8.com/illustrations"
            >
              Ouch!
            </a>
          </p>
          <p className="hidden sm:block">&bull;</p>
          <p className="text-sm text-gray-500 sm:py-2 sm:mt-0 mt-4">
            <a href="/legal/terms.pdf" className="link-style" target="_blank">
              Terms
            </a>{" "}
            &amp;{" "}
            <a href="/legal/privacy.pdf" className="link-style" target="_blank">
              Privacy Policy
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DomainwatchLayout;
