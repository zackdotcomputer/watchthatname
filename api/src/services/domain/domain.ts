import type { BeforeResolverSpecType } from "@redwoodjs/api";

import { db } from "src/lib/db";
import { requireAuth } from "src/lib/auth";
import type { Domain, SearchQueryInput, SetWishInput } from "types/graphql";
import { Availability, availabilityForDomains } from "src/lib/godaddy";
import { buildDomains } from "src/lib/buildDomains";

const DOMAINS_PER_PAGE = 20;
const CACHE_TTL = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(() => requireAuth());
  rules.skip({ only: ["search"] });
};

export const search = async ({ input, page = 1 }: { input: SearchQueryInput; page?: number }) => {
  const allDomains = buildDomains(input);

  const selection = allDomains
    .slice((page - 1) * DOMAINS_PER_PAGE, page * DOMAINS_PER_PAGE)
    .map((d) => {
      // We can only search for the root domain, which will always be the last two chords.
      // E.G. tw.itter.com -> searchable is itter.com
      return {
        original: d,
        searchable: (d.length > 2 ? d.slice(-2) : d).join(".")
      };
    });
  const searchables = selection.map((s) => s.searchable);

  const [allResults, allFavorited] = await Promise.all([
    getSearchResults(searchables),
    getFavorited(searchables)
  ]);

  return selection.flatMap((s): Domain[] => {
    const result = allResults.find((r) => r.domain === s.searchable);
    if (!result) {
      return [];
    } else {
      return [
        {
          id: result.domain,
          domain: result.domain,
          desiredDomain: s.original.join("."),
          available: result.available ?? true,
          definitive: result.definitive ?? false,
          price: result.price && {
            currency: result.currency,
            price: result.price
          },
          favorited: allFavorited?.some((f) => result.domain === f)
        }
      ];
    }
  });
};

export const setWishdomain = async ({
  input: { domain, favorited, desiredDomain }
}: {
  input: SetWishInput;
}) => {
  const [faveRecord, cachedAvailability] = await Promise.all([
    db.wishdomain.findUnique({
      where: { domain_user: { domain, user: context.currentUser.id } },
      rejectOnNotFound: false
    }),
    db.domainResult.findUnique({
      where: { domain },
      rejectOnNotFound: false
    })
  ]);

  if (faveRecord && !favorited) {
    await db.wishdomain.delete({
      where: { id: faveRecord.id }
    });
  } else if (!faveRecord && favorited) {
    await db.wishdomain.create({
      data: {
        user: context.currentUser.id,
        domain,
        desiredDomain: desiredDomain ?? domain
      }
    });
  }

  return {
    id: domain,
    domain,
    desiredDomain: desiredDomain ?? faveRecord.desiredDomain ?? domain,
    available: cachedAvailability?.available ?? true,
    definitive: cachedAvailability?.definitive ?? false,
    price: cachedAvailability?.price && {
      currency: cachedAvailability.currency,
      price: cachedAvailability.price
    },
    favorited
  };
};

async function getSearchResults(searchables: string[]): Promise<Availability[]> {
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

  return [...results, ...cached];
}

async function getFavorited(searchables: string[]): Promise<null | string[]> {
  return context.currentUser
    ? db.wishdomain
        .findMany({
          where: {
            AND: [
              {
                user: context.currentUser.id
              },
              {
                domain: {
                  in: searchables
                }
              }
            ]
          },
          select: {
            domain: true
          }
        })
        .then((res) => res.map((r) => r.domain))
    : Promise.resolve(null);
}
