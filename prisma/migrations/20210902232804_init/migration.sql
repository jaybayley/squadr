-- CreateTable
CREATE TABLE "Formation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "config" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "injured" BOOLEAN,
    "suspended" BOOLEAN
);

-- CreateTable
CREATE TABLE "Squad" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "formationId" INTEGER NOT NULL,
    "config" TEXT NOT NULL,
    FOREIGN KEY ("formationId") REFERENCES "Formation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Formation.name_unique" ON "Formation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Formation.config_unique" ON "Formation"("config");

-- CreateIndex
CREATE UNIQUE INDEX "Player.number_unique" ON "Player"("number");
