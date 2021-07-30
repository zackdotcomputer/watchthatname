import { Redirect, routes } from "@redwoodjs/router";
import React, { useMemo } from "react";
import SearchForm from "src/components/Search/SearchForm/SearchForm";
import SingleDomainCell from "src/components/SingleDomainCell";

type DomainDetailsProps = {
  domain: string;
};

const DomainDetailsPage = ({ domain }: DomainDetailsProps) => {
  const decoded = useMemo(() => domain && decodeURIComponent(domain), [domain]);

  if ((decoded ?? "").length < 3) {
    return <Redirect to={routes.search()} />;
  }

  return (
    <>
      <section>
        <SearchForm initialValue={decoded} />
      </section>
      <section className="mt-4">
        <SingleDomainCell domain={decoded} />
      </section>
    </>
  );
};

export default DomainDetailsPage;
