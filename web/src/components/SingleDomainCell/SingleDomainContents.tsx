import React, { useMemo } from "react";
import { Domain } from "types/graphql";

export default function SingleDomainContents({ item }: { item: Domain }) {
  const prettywhois = useMemo(() => {
    if (!item?.whois) {
      return item?.whois;
    }

    try {
      const parsed = JSON.parse(item.whois);
      const unparsed = JSON.stringify(parsed, null, 2);
      return unparsed;
    } catch {
      return item.whois;
    }
  }, [item?.whois]);

  if (item.available) {
    return <section className=" font-bold text-green-900 m-4">This domain is available!</section>;
  }

  return (
    <section className="m-4">
      <div className="font-semibold">
        This domain is <strong className="text-red-800">not</strong> available
      </div>
      <h4 className="font-bold mt-4">WhoIs:</h4>
      <pre className="whitespace-pre-wrap break-words">
        {prettywhois ?? "WhoIs could not be loaded..."}
      </pre>
    </section>
  );
}
