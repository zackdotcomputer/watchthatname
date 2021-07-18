import type { Prisma } from "@prisma/client";

export const standard = defineScenario<Prisma.WishdomainCreateArgs>({
  wishdomain: { one: { domain: "String" }, two: { domain: "String" } }
});

export type StandardScenario = typeof standard;
