import type { Prisma } from "@prisma/client";
import type { BeforeResolverSpecType } from "@redwoodjs/api";

import { db } from "src/lib/db";
import { requireAuth } from "src/lib/auth";

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(requireAuth);
};

export const wishdomains = () => {
  return db.wishdomain.findMany();
};

export const wishdomain = ({ id }: Prisma.WishdomainWhereUniqueInput) => {
  return db.wishdomain.findUnique({
    where: { id }
  });
};

interface CreateWishdomainArgs {
  input: Prisma.WishdomainCreateInput;
}

export const createWishdomain = ({ input }: CreateWishdomainArgs) => {
  requireAuth()
  console.log(`Would be owned by ${JSON.stringify(context.currentUser)}`);
  return db.wishdomain.create({
    data: input
  });
};

interface UpdateWishdomainArgs extends Prisma.WishdomainWhereUniqueInput {
  input: Prisma.WishdomainUpdateInput;
}

export const updateWishdomain = ({ id, input }: UpdateWishdomainArgs) => {
  return db.wishdomain.update({
    data: input,
    where: { id }
  });
};

export const deleteWishdomain = ({ id }: Prisma.WishdomainWhereUniqueInput) => {
  return db.wishdomain.delete({
    where: { id }
  });
};
