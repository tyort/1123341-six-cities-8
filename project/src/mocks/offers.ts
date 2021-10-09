import {Offer} from '../types/offer';

export const offers: Offer[] = [
  {
    id: 'dj4j44',
    title: 'Oh! This is awesome',
    images: ['apartment-01.jpg', 'apartment-02.jpg', 'apartment-03.jpg'],
    category: 'Premium',
    rating: 9.8,
    features: [
      {
        title: 'High ceilings',
        addition: 'ceilings',
      }, {
        title: '4 bedrooms',
        addition: 'bedrooms',
      },
    ],
    price: 333,
    bonuses: ['Wi-Fi', 'Kitchen'],
    owner: {
      name: 'Patrick Bateman',
      avatar: 'avatar-angelina.jpg',
      status: 'Pro',
      text: 'The building is green and from 18th century.',
    },
    reviews: [
      {
        avatar: 'pic12312.jpg',
        name: 'Jordan',
        setRating: 80,
        text: 'I can`t sleep, man',
        date: new Date(2021, 4, 20),
      },
    ],
  },
  {
    id: 'fjejf79',
    title: 'This is my home',
    images: ['apartment-01.jpg', 'apartment-02.jpg', 'apartment-03.jpg'],
    category: 'Economy',
    rating: 5.3,
    features: [
      {
        title: 'High ceilings',
        addition: 'ceilings',
      }, {
        title: '4 bedrooms',
        addition: 'bedrooms',
      },
    ],    price: 45,
    bonuses: ['Wi-Fi', 'Towels'],
    owner: {
      name: 'Rebecca',
      avatar: 'avatar-max.jpg',
      status: 'Pro',
      text: 'Small apartment for fun',
    },
    reviews: [
      {
        avatar: 'pic13422.jpg',
        name: 'Mimi',
        setRating: 40,
        text: 'I`d been there and i like it',
        date: new Date(2021, 5, 11),
      },
      {
        avatar: 'pic77422.jpg',
        name: 'Kori',
        setRating: 60,
        text: 'So much dust!',
        date: new Date(2021, 8, 20),
      },
    ],
  },
  {
    id: 'gfgrge4g',
    title: 'Good place for sleeping',
    images: ['apartment-01.jpg', 'apartment-02.jpg', 'apartment-03.jpg'],
    category: 'Economy',
    rating: 6.3,
    features: [
      {
        title: 'High ceilings',
        addition: 'ceilings',
      }, {
        title: '4 bedrooms',
        addition: 'bedrooms',
      },
    ],    price: 45,
    bonuses: ['Wi-Fi', 'Towels'],
    owner: {
      name: 'Joseph',
      avatar: 'avatar-angelina.jpg',
      status: 'Pro',
      text: 'Small apartment for fun',
    },
    reviews: [
      {
        avatar: 'pic13422.jpg',
        name: 'Mimi',
        setRating: 40,
        text: 'I`d been there and i like it',
        date: new Date(2021, 5, 11),
      },
      {
        avatar: 'pic77422.jpg',
        name: 'Kori',
        setRating: 60,
        text: 'So much dust!',
        date: new Date(2021, 8, 20),
      },
      {
        avatar: 'pic77422.jpg',
        name: 'Kori',
        setRating: 60,
        text: 'So much dust!',
        date: new Date(2021, 8, 20),
      },
    ],
  },
  {
    id: 'kjrmnge4g',
    title: 'Just like the others apartment',
    images: ['apartment-01.jpg', 'apartment-02.jpg', 'apartment-03.jpg'],
    category: 'Premium',
    rating: 2.3,
    features: [
      {
        title: 'High ceilings',
        addition: 'ceilings',
      }, {
        title: '4 bedrooms',
        addition: 'bedrooms',
      },
    ],    price: 222,
    bonuses: ['Wi-Fi', 'Towels', 'Heating', 'Kitchen'],
    owner: {
      name: 'Indica',
      avatar: 'avatar-max.jpg',
      status: 'New',
      text: 'Only for working in silence',
    },
    reviews: [
      {
        avatar: 'pic11122.jpg',
        name: 'Petr',
        setRating: 20,
        text: 'I was like in nightmare',
        date: new Date(2020, 8, 20),
      },
      {
        avatar: 'pic47422.jpg',
        name: 'Jane',
        setRating: 60,
        text: 'Give me my money back!',
        date: new Date(2020, 8, 20),
      },
    ],
  },
];
