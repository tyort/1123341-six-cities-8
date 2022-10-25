import prisma from '../../lib/prisma';

export default class OfferRepository {
  constructor() {
    this.prisma = prisma;
  }

  async createOffers(items) {
    items.forEach(async (offer) => {
      await this.createCities(offer.city);
      await this.createHosts(offer.host);
      await this.createOfferLocation(offer.location);
    });
  }

  // async createOffer(offer) {
  //   const {
  //     location,
  //     is_premium,
  //     bedrooms,
  //     city,
  //     host,
  //     description,
  //     goods,
  //     images,
  //     is_favorite,
  //     max_adults,
  //     preview_image,
  //     price,
  //     rating,
  //     title,
  //     type,
  //   } = offer;

  //   const data = {
  //     latitude: location.latitude,
  //     longitude: location.longitude,
  //     zoom: location.zoom,
  //     offer: {
  //       create: {
  //         bedrooms,
  //         city: {
  //           connect: {
  //             name: city.name,
  //           },
  //         },
  //         host: {
  //           connect: {
  //             name: host.name,
  //           },
  //         },
  //         description,
  //         goods,
  //         images,
  //         is_favorite,
  //         is_premium,
  //         max_adults,
  //         preview_image,
  //         price,
  //         rating,
  //         title,
  //         type,
  //       },
  //     },
  //   };
  // }

  async createOfferLocation(location) {
    const { latitude, longitude } = location;

    await this.prisma.offerLocation.upsert({
      where: {
        latitude_longitude: {
          latitude,
          longitude,
        },
      },
      update: { ...location },
      create: { ...location },
    });
  }

  async createHosts(host) {
    await this.prisma.host.upsert({
      where: { name: host.name },
      update: { ...host },
      create: { ...host },
    });
  }

  async createCities(city) {
    const convertedCity = this.prepareCityToDB(city);
    await this.prisma.city.upsert({
      where: { name: city.name },
      update: convertedCity,
      create: convertedCity,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  prepareCityToDB(city) {
    const { location, name } = city;
    const { latitude, longitude, zoom } = location;

    return {
      name,
      location: {
        connectOrCreate: {
          create: {
            latitude,
            longitude,
            zoom,
          },
          where: {
            latitude_longitude: {
              latitude,
              longitude,
            },
          },
        },
      },
    };
  }
}
