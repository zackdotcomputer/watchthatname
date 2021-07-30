-- CreateTable
CREATE TABLE "DomainResult" (
    "id" SERIAL NOT NULL,
    "domain" TEXT NOT NULL,
    "searchTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isAvailable" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
);
