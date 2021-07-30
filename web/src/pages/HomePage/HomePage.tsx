import { Form, SearchField, Submit } from "@redwoodjs/forms";
import { navigate, routes } from "@redwoodjs/router";
import React, { useEffect } from "react";
import { usePlausible, useTrackPageview } from "src/PlausibleProvider";

const HomePage = () => {
  const onSubmit = (data) => {
    navigate(routes.searchQuery({ query: encodeURIComponent(data.query ?? "") }));
  };

  useTrackPageview();

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-col px-5 py-16 justify-center items-center">
          <img
            className="md:w-1/4 w-5/6 mb-8 object-cover object-center"
            alt="Binoculars Illustration by Icons 8 from Ouch"
            src="/binoculars.png"
          />
          <div className="w-full md:w-2/3 flex flex-col mb-4 items-center text-center">
            <h1 className="title-font sm:text-8xl text-5xl mb-4 font-medium text-gray-900">
              Watch That Name
            </h1>
            <p className="mb-8 leading-relaxed text-2xl">
              Find great domain names, remember them privately,
              <br />
              buy them when you&rsquo;re ready to <strong>actually</strong> build.
            </p>
            <Form onSubmit={onSubmit} className="flex w-full justify-center items-end">
              <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
                <SearchField
                  name="query"
                  placeholder="mygreatidea.com"
                  className="w-full bg-gray-100 bg-opacity-50 rounded focus:ring-2 focus:ring-blue-200 focus:bg-transparent border border-gray-300 focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <Submit className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">
                Search
              </Submit>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
