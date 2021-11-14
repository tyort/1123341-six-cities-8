import leaflet from 'leaflet';

export enum AppRoute {
  SignIn = '/login',
  Main = '/',
  Favorites = '/favorites',
  Room = '/offer/:id'
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

// Запросы на "бэкэнд"
export enum APIRoute {
  Offers = '/hotels',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite',
}

export enum SortName {
  Popular = 'Popular',
  PriceAscending = 'Price: low to high',
  PriceDescending = 'Price: high to low',
  RateDescending = 'Top rated first'
}

export enum CityName {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export enum ActionName {
  ChangeCity = 'offers/changeCity',
  ChangeSortName = 'offers/changeSortName',
  LoadOffers = 'offers/loadOffers',
  LoadFavorites = 'offers/loadFavorites',
  LoadComments = 'offer/loadComments',
  LoadNearby = 'offer/loadNearbyOffers',
  ChangeFavorite = 'offer/isFavorite',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  SetEmail = 'user/setEmail',
  RedirectToRoute = 'app/redirectToRoute'
}

