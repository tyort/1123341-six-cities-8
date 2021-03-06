import leaflet from 'leaflet';

export enum AppRoute {
  SignIn = '/login',
  Main = '/',
  Favorites = '/favorites',
  Room = '/offer/:id',
  OfferPostfix = '/offer/',
  NearbyPostfix = '/nearby'
}

export enum ResponseText {
  AuthFail = 'Не забудьте авторизоваться',
  EmailFail = 'Введите корректный email',
  Postfail = 'Произошла ошибка при отправке данных'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const defaultCustomIcon = leaflet.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

export const currentCustomIcon = leaflet.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

export enum APIRoute {
  Offers = '/hotels',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite',
}

export const months = new Map([
  [0, 'January'],
  [1, 'February'],
  [2, 'March'],
  [3, 'April'],
  [4, 'May'],
  [5, 'June'],
  [6, 'July'],
  [7, 'August'],
  [8, 'September'],
  [9, 'October'],
  [10, 'November'],
  [11, 'December'],
]);

export const cities: readonly string[] = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export enum ScreenType {
  Main = 'Main screen',
  Offer = 'Offer screen',
  Favorites = 'Favorites screen'
}

export enum SortName {
  Popular = 'Popular',
  PriceAscending = 'Price: low to high',
  PriceDescending = 'Price: high to low',
  RateDescending = 'Top rated first'
}

export enum ActionName {
  ChangeCity = 'offers/changeCity',
  ChangeSortName = 'offers/changeSortName',
  LoadOffers = 'offers/loadOffers',
  LoadCurrentOffer = 'offers/loadCurrentOffer',
  LoadFavorites = 'offers/loadFavorites',
  SetPostFailed = 'offer/isPostCommentFailed',
  LoadComments = 'offer/loadComments',
  LoadNearby = 'offer/loadNearbyOffers',
  ChangeFavorite = 'offer/isFavorite',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  SetEmail = 'user/setEmail',
  RedirectToRoute = 'app/redirectToRoute'
}

export const getRandomInt = (max: number): number => Math.floor(Math.random() * max);
export const passPattern = /^(?=.*[A-Za-z])(?=.*\d)/i;

