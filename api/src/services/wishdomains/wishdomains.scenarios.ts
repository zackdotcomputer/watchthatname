import type { Prisma } from "@prisma/client";

export const standard = defineScenario<Prisma.WishdomainCreateArgs>({
  wishdomain: {
    one: { domain: "String", desiredDomain: "Desired", user: "abc123" },
    two: { domain: "String", desiredDomain: "Desired", user: "abc123" }
  }
});

export type StandardScenario = typeof standard;
