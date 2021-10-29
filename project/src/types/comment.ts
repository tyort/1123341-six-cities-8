export type Comment = {
  comment: string,
  date: Date,
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

