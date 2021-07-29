import type { BeforeResolverSpecType } from "@redwoodjs/api";

import { db } from "src/lib/db";
import { requireAuth } from "src/lib/auth";
import type { DomainResult, SearchQueryInput } from "../../../types/graphql";
import tlds from "src/lib/tlds";
import { availabilityForDomains } from "src/lib/godaddy";

const DOMAIN_REGEX = /[^a-zA-Z0-9\-]/;
const DOMAINS_PER_PAGE = 20;
const CACHE_TTL = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(() => requireAuth());
};

export const search = async (input: SearchQueryInput, page = 1) => {
  const allDomains = buildDomains(input);

  const selection = allDomains
    .slice(page - 1 * DOMAINS_PER_PAGE, page * DOMAINS_PER_PAGE)
    .map((d) => {
      // We can only search for the root domain, which will always be the last two chords.
      // E.G. tw.itter.com -> searchable is itter.com
      return {
        original: d,
        searchable: (d.length > 2 ? d.slice(-2) : d).join(".")
      };
    });
  const searchables = selection.map((s) => s.searchable);

  const cacheThreshold = Date.now() - CACHE_TTL;

  const allCached = await db.domainResult.findMany({
    where: {
      domain: {
        in: searchables
      }
    }
  });

  const cached = allCached.filter((c) => c.searchTime.getTime() >= cacheThreshold);

  // Filter out any we had cache hits for and send the rest to godaddy.
  const sendToGodaddy = searchables.filter((s) => !cached.some((v) => v.domain === s));
  const results = await availabilityForDomains(sendToGodaddy);

  // Update the cache
  if (results.length > 0) {
    const outdated = allCached.filter((c) => c.searchTime.getTime() < cacheThreshold);
    const updatePromises = outdated.map((o) => {
      const update = results.find((r) => r.domain === o.domain);
      return db.domainResult.update({
        where: {
          id: o.id
        },
        data: {
          available: update.available,
          definitive: update.definitive,
          price: update.price,
          currency: update.currency
        },
        select: {}
      });
    });
    const toCreate = results.filter((r) => !outdated.some((o) => o.domain === r.domain));
    await Promise.allSettled([
      Promise.allSettled(updatePromises),
      db.domainResult.createMany({
        data: toCreate
      })
    ]);
  }

  const allResults = [...results, ...cached];

  return selection.flatMap((s): DomainResult[] => {
    const result = allResults.find((r) => r.domain === s.searchable);
    if (!result) {
      return [];
    } else {
      return [
        {
          domain: result.domain,
          desiredDomain: s.original.join("."),
          available: result.available ?? false,
          definitive: result.definitive ?? false,
          price: result.price && {
            currency: result.currency,
            price: result.price
          }
        }
      ];
    }
  });
};

export const buildDomains = ({ query, noCountryCodes }: SearchQueryInput): string[][] => {
  const domainparts = query.split(".").filter((s) => s.length > 0);

  let preferredTLD = null;
  let searchString: string;
  if (domainparts.length > 1) {
    const singleBarrel = domainparts[domainparts.length - 1].toLowerCase();
    const doubleBarrel =
      domainparts.length > 2 ? domainparts.slice(-2).join(".").toLowerCase() : null;

    if (doubleBarrel && tlds.some((tld) => tld.name === doubleBarrel)) {
      preferredTLD = doubleBarrel;
      searchString = domainparts.slice(0, -2).join(" ");
    } else if (singleBarrel && tlds.some((tld) => tld.name === singleBarrel)) {
      preferredTLD = singleBarrel;
      searchString = domainparts.slice(0, -1).join(" ");
    }
  } else {
    searchString = domainparts.join(" ");
  }

  const dispreferredTLDs = tlds
    .filter((t) => t.name !== preferredTLD && (!noCountryCodes || t.type !== "COUNTRY_CODE"))
    .map((t) => t.name);

  // Split on characters invalid for a domain
  let nameparts = searchString.split(DOMAIN_REGEX).filter((s) => s.length > 0);

  if (nameparts.length < 1) {
    return [];
  }

  // If it would be more than 5 chunks, just block it back into one to save time.
  if (nameparts.length > 5) {
    nameparts = [nameparts.join("")];
  }

  let composedNames = dispreferredTLDs.flatMap((tld) => {
    const result = [[nameparts.join(""), tld]];
    if (nameparts.length > 1) {
      result.push([...nameparts, tld], [nameparts.join("-"), tld]);
    }
    return result;
  });

  if (preferredTLD) {
    const result = [[nameparts.join(""), preferredTLD]];
    if (nameparts.length > 1) {
      result.push([...nameparts, preferredTLD], [nameparts.join("-"), preferredTLD]);
    }
    composedNames = [...result, ...composedNames];
  }

  return composedNames;
};
