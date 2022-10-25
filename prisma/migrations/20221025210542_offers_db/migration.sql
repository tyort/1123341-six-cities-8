-- CreateTable
CREATE TABLE "offer" (
    "id" SERIAL NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,
    "hostId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "goods" TEXT[],
    "images" TEXT[],
    "is_favorite" BOOLEAN NOT NULL,
    "is_premium" BOOLEAN NOT NULL,
    "offerLocationId" INTEGER NOT NULL,
    "max_adults" INTEGER NOT NULL,
    "preview_image" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "rating" DECIMAL(15,1) NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offerLocation" (
    "id" SERIAL NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "zoom" INTEGER NOT NULL,

    CONSTRAINT "offerLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "city" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "zoom" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("latitude","longitude")
);

-- CreateTable
CREATE TABLE "host" (
    "id" SERIAL NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "is_pro" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "host_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "offer_offerLocationId_key" ON "offer"("offerLocationId");

-- CreateIndex
CREATE UNIQUE INDEX "offerLocation_latitude_longitude_key" ON "offerLocation"("latitude", "longitude");

-- CreateIndex
CREATE UNIQUE INDEX "city_name_key" ON "city"("name");

-- CreateIndex
CREATE UNIQUE INDEX "location_cityId_key" ON "location"("cityId");

-- CreateIndex
CREATE UNIQUE INDEX "host_name_key" ON "host"("name");

-- AddForeignKey
ALTER TABLE "offer" ADD CONSTRAINT "offer_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offer" ADD CONSTRAINT "offer_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "host"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offer" ADD CONSTRAINT "offer_offerLocationId_fkey" FOREIGN KEY ("offerLocationId") REFERENCES "offerLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
