import { Link, routes } from "@redwoodjs/router";
import React from "react";
import DomainwatchLayout from "src/layouts/DomainwatchLayout/DomainwatchLayout";

export default () => (
  <DomainwatchLayout className="flex flex-col justify-center items-center p-2">
    <div className="border rounded bg-gray-100 border-solid border-gray-200 p-6 px-8 md:max-w-md mx-auto text-center flex flex-col space-y-4 items-center">
      <img className="" src="/binoculars-small.png" alt="Binoculars" />
      <h1 className="text-4xl font-bold">
        <span>404 Page Not Found</span>
      </h1>
      <p className="leading-loose">
        Sorry but that page has gone missing.
        <br />
        We&rsquo;ll keep an eye out for it.
      </p>
      <Link className="link-style" to={routes.home()}>
        Return home
      </Link>
    </div>
  </DomainwatchLayout>
);
