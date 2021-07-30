// This page will be rendered when an error makes it all the way to the top of the
// application without being handled by a Javascript catch statement or React error
// boundary.
//
// You can modify this page as you wish, but it is important to keep things simple to
// avoid the possibility that it will cause its own error. If it does, Redwood will
// still render a generic error page, but your users will prefer something a bit more
// thoughtful. =)
import { Link, routes } from "@redwoodjs/router";
import React from "react";
import DomainwatchLayout from "src/layouts/DomainwatchLayout/DomainwatchLayout";

export default () => (
  <DomainwatchLayout className="flex flex-col justify-center items-center p-2">
    <div className="border rounded bg-gray-100 border-solid border-gray-200 p-6 px-8 md:max-w-md mx-auto text-center flex flex-col space-y-4 items-center">
      <h1 className="text-4xl font-bold">
        <span>500 Server Error</span>
      </h1>
      <p className="leading-loose">This is embarassing but something went wrong...</p>
      <Link className="link-style" to={routes.home()}>
        Return home
      </Link>
    </div>
  </DomainwatchLayout>
);
