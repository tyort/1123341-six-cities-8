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

export type Offer = {
  id: string;
  city: string,
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
