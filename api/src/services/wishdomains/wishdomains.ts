import type { Prisma } from "@prisma/client";
import type { BeforeResolverSpecType } from "@redwoodjs/api";
import type { User } from "@clerk/clerk-sdk-node";

import { db } from "src/lib/db";
import { requireAuth } from "src/lib/auth";

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(() => requireAuth());
};

export const wishdomains = () => {
  const user = context.currentUser as User;
  return db.wishdomain.findMany({
    where: {
      user: user.id
    }
  });
};

export const wishdomain = async ({ id }: Prisma.WishdomainWhereUniqueInput) => {
  const result = await db.wishdomain.findUnique({
    where: { id }
  });

  requireAuth({ id: result.user });

  return db.wishdomain.findUnique({
    where: { id }
  });
};

interface CreateWishdomainArgs {
  input: Prisma.WishdomainCreateInput;
}

export const createWishdomain = ({ input }: CreateWishdomainArgs) => {
  return db.wishdomain.create({
    data: {
      ...input,
      user: context.currentUser.id
    }
  });
};

interface UpdateWishdomainArgs extends Prisma.WishdomainWhereUniqueInput {
  input: Prisma.WishdomainUpdateInput;
}

export const updateWishdomain = async ({ id, input }: UpdateWishdomainArgs) => {
  const owner = (
    await db.wishdomain.findUnique({
      where: { id },
      select: { user: true }
    })
  )?.user;

  requireAuth({ id: owner });

  return db.wishdomain.update({
    data: input,
    where: { id }
  });
};

export const deleteWishdomain = async ({ id }: Prisma.WishdomainWhereUniqueInput) => {
  const owner = (
    await db.wishdomain.findUnique({
      where: { id },
      select: { user: true }
    })
  )?.user;

  requireAuth({ id: owner });

  return db.wishdomain.delete({
    where: { id }
  });
};
