import {Offer} from '../types/offer';

export const offers: Offer[] = [
  {
    id: 'dj4j44',
    title: 'Oh! This is awesome',
    class: 'Premium',
    rating: 9.8,
    features: ['High ceilings', '4 bedrooms'],
    price: 333,
    inside: ['Wi-Fi', 'Kitchen'],
    owner: {
      name: 'Patrick Bateman',
      status: 'Pro',
      description: 'The building is green and from 18th century.',
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
    class: 'Economy',
    rating: 5.3,
    features: ['Only for party', 'No glass'],
    price: 45,
    inside: ['Wi-Fi', 'Towels'],
    owner: {
      name: 'Rebecca',
      status: 'Pro',
      description: 'Small apartment for fun',
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
    class: 'Economy',
    rating: 6.3,
    features: ['No people', 'No glass'],
    price: 45,
    inside: ['Wi-Fi', 'Towels'],
    owner: {
      name: 'Joseph',
      status: 'Pro',
      description: 'Small apartment for fun',
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
    class: 'Premium',
    rating: 2.3,
    features: ['Silent'],
    price: 222,
    inside: ['Wi-Fi', 'Towels', 'Heating', 'Kitchen'],
    owner: {
      name: 'Indica',
      status: 'New',
      description: 'Only for working in silence',
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
