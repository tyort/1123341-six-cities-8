export type Owner = {
  name: string;
  status: string;
  description: string;
}

export type Review = {
  avatar: string;
  name: string;
  setRating: string | number;
  text: string;
  date: Date
}

export type Offer = {
  id: string | number
  title: string;
  class: string;
  rating: number;
  features: string[];
  price: number;
  inside: string[];
  owner: Owner;
  reviews: Review[]
}
