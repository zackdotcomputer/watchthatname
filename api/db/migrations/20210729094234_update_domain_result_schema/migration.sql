/*
  Warnings:

  - You are about to drop the column `isAvailable` on the `DomainResult` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[domain]` on the table `DomainResult` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `available` to the `DomainResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `definitive` to the `DomainResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `DomainResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desiredDomain` to the `Wishdomain` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DomainResult" DROP COLUMN "isAvailable",
ADD COLUMN     "available" BOOLEAN NOT NULL,
ADD COLUMN     "currency" TEXT,
ADD COLUMN     "definitive" BOOLEAN NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Wishdomain" ADD COLUMN     "desiredDomain" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DomainResult.domain_unique" ON "DomainResult"("domain");
