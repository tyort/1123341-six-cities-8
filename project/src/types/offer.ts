export type Owner = {
  name: string;
  avatar: string;
  status: string;
  text: string;
}

export type Review = {
  avatar: string;
  name: string;
  setRating: string | number;
  text: string;
  date: string;
}

export type Feature = {
  title: string;
  addition: string;
}

export type Coordinate = {
  latitude: number;
  longitude: number;
}

export type City = {
  lat: number;
  lng: number;
  title: string;
  zoom: number;
}

export type Offer = {
  id: string;
  city: string,
  coordinate: Coordinate,
  title: string;
  type: string;
  images: string[];
  category: string;
  rating: number;
  features: Feature[];
  price: number;
  bonuses: string[];
  owner: Owner;
  reviews: Review[]
}
