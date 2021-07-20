import { Link, routes } from "@redwoodjs/router";
import React from "react";
import UserStateNavBit from "src/components/UserStateNavBit/UserStateNavBit";

type DomainwatchLayoutProps = {
  children: React.ReactNode;
};

const DomainwatchLayout = ({ children }: DomainwatchLayoutProps) => {
  return (
    <>
      <header>
        <h1>Redwood Blog</h1>
        <nav>
          <ul>
            <li>
              <Link to={routes.about()}>About</Link>
            </li>
            <li>
              <UserStateNavBit />
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
};

export default DomainwatchLayout;
