import type { SearchQueryInput } from "types/graphql";
import tlds from "src/lib/tlds";
import { logger } from "src/lib/logger";

const DOMAIN_REGEX = /[^a-zA-Z0-9\-]/;

export const splitName = (domain: string): { desired: string; valid: null | string } => {
  const domainparts = domain.split(".").filter((s) => s.length > 0);

  let validDomain = null;
  if (domainparts.length > 1) {
    const singleBarrel = domainparts[domainparts.length - 1].toLowerCase();
    const doubleBarrel =
      domainparts.length > 2 ? domainparts.slice(-2).join(".").toLowerCase() : null;

    if (doubleBarrel && tlds.some((tld) => tld.name === doubleBarrel)) {
      validDomain = domainparts.slice(-3).join(".");
    } else if (singleBarrel && tlds.some((tld) => tld.name === singleBarrel)) {
      validDomain = domainparts.slice(-2).join(".");
    }
  }

  return {
    desired: domain,
    valid: validDomain ?? null
  };
};

export const buildDomains = ({ query, noCountryCodes }: SearchQueryInput): string[][] => {
  logger.trace("Building domains for ", query);

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
  }

  if (!searchString) {
    logger.trace("- No preferred TLD detected");
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

  logger.trace(`- Composing over name parts: ${JSON.stringify(nameparts)}`);

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

  logger.trace(`- Resulted in ${composedNames.length} names: ${JSON.stringify(composedNames)}`);

  return composedNames;
};
