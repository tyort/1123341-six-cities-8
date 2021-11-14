export type Comment = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: {
    'avatar_url': string,
    id: number,
    'is_pro': boolean,
    name: string
  }
};

export type NewComment = {
  offerId: number,
  comment: string,
  rating: number
};

