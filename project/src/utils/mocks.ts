import {Offer} from '../types/offer';
import {Comment} from '../types/comment';
import {datatype, random, name, internet, image, date} from 'faker';

const getRandomInt = (max: number): number => Math.floor(Math.random() * max);
export const cities = [
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13,
    },
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13,
    },
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13,
    },
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13,
    },
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13,
    },
  },
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
];

export const makeFakeOffer = (): Offer => ({
  id: datatype.number(),
  city: cities[getRandomInt(6)],
  location: {
    latitude: datatype.number(),
    longitude: datatype.number(),
    zoom: datatype.number(),
  },
  title: name.title(),
  type: random.word(),
  images: new Array(3).fill(null).map(() => image.image()),
  description: random.words(),
  category: random.word(),
  rating: datatype.number(),
  price: datatype.number(),
  goods: new Array(3).fill(null).map(() => name.jobDescriptor()),
  host: {
    id: datatype.number(),
    name: name.firstName(),
    'avatar_url': internet.url(),
    'is_pro': datatype.boolean(),
  },
  'is_favorite': false,
  'is_premium': datatype.boolean(),
  bedrooms: datatype.number(),
  'max_adults': datatype.number(),
  'preview_image': image.image(),
} as Offer);

export const makeFakeComment = (): Comment => ({
  comment: random.words(),
  date: date.past().toString(),
  id: datatype.number(),
  rating: datatype.number(),
  user: {
    'avatar_url': image.imageUrl(),
    id: datatype.number(),
    'is_pro': datatype.boolean(),
    name: name.firstName(),
  },
});

export const makeFakeFavoriteOffer = (): Offer => ({
  ...makeFakeOffer(),
  'is_favorite': true,
});

export const makeFakeOffers = (): Offer[] => (
  new Array(5)
    .fill(null)
    .map(() => makeFakeOffer()) as Offer[]
);

export const makeFakeFavoriteOffers = (): Offer[] => (
  cities.map((city) => ({...makeFakeFavoriteOffer(), city}))
);

export const makeFakeComments = (): Comment[] => (
  new Array(5)
    .fill(null)
    .map(() => makeFakeComment()) as Comment[]
);
