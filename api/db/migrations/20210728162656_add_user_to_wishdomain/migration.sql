/*
  Warnings:

  - You are about to drop the `UserExample` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user` to the `Wishdomain` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Wishdomain" ADD COLUMN     "user" TEXT NOT NULL;

-- DropTable
DROP TABLE "UserExample";
