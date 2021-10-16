import {Offer} from '../types/offer';

export const offers: Offer[] = [
  {
    id: 'dj4j44',
    city: 'Amsterdam',
    coordinate: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
    },
    title: 'Oh! This is awesome',
    type: 'Apartment',
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
        avatar: 'avatar-angelina.jpg',
        name: 'Jordan',
        setRating: 80,
        text: 'I can`t sleep, man',
        date: '2019-04-24',
      },
    ],
  },
  {
    id: 'fjejf79',
    city: 'Amsterdam',
    coordinate: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198,
    },
    title: 'This is my home',
    type: 'House',
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
        date: '2021-04-24',
      },
      {
        avatar: 'pic77422.jpg',
        name: 'Kori',
        setRating: 60,
        text: 'So much dust!',
        date: '2020-04-24',
      },
    ],
  },
  {
    id: 'gfgrge4g',
    city: 'Moscow',
    coordinate: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
    },
    title: 'Good place for sleeping',
    type: 'Room',
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
        date: '2019-04-22',
      },
      {
        avatar: 'pic77422.jpg',
        name: 'Kori',
        setRating: 60,
        text: 'So much dust!',
        date: '2019-10-24',
      },
      {
        avatar: 'pic77422.jpg',
        name: 'Kori',
        setRating: 60,
        text: 'So much dust!',
        date: '2019-05-24',
      },
    ],
  },
  {
    id: 'kjrmnge4g',
    city: 'Paris',
    coordinate: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
    },
    title: 'Just like the others apartment',
    type: 'Bungalo',
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
        date: '2021-06-14',
      },
      {
        avatar: 'pic47422.jpg',
        name: 'Jane',
        setRating: 60,
        text: 'Give me my money back!',
        date: '2019-09-10',
      },
    ],
  },
];
