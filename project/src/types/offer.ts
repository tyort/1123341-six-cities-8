import {City} from './city';

export type Host = {
  id: string | number;
  name: string;
  'avatar_url': string;
  'is_pro': boolean;
}

export type Review = {
  avatar: string;
  name: string;
  id: string;
  setRating: string | number;
  text: string;
  date: string;
}

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type Offer = {
  id: string | number;
  city: City,
  location: Location,
  title: string;
  type: string;
  images: string[];
  description: string;
  category: string;
  rating: number;
  price: number;
  goods: string[];
  host: Host;
  reviews: Review[];
  'is_favorite': boolean;
  'is_premium': boolean;
  bedrooms: number;
  'max_adults': number;
  'preview_image': string;
}
