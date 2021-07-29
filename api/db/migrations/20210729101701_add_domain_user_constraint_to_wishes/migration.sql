/*
  Warnings:

  - A unique constraint covering the columns `[domain,user]` on the table `Wishdomain` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Wishdomain.domain_user_unique" ON "Wishdomain"("domain", "user");
