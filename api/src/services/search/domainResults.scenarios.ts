import type { Prisma } from "@prisma/client";

export const standard = defineScenario<Prisma.DomainResultCreateArgs>({
  domainResult: {
    one: { domain: "String", available: true, definitive: true, price: 124100 },
    two: { domain: "String", available: true, definitive: true, price: 124100 }
  }
});

export type StandardScenario = typeof standard;
