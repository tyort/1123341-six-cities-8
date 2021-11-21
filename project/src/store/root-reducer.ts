import {combineReducers} from 'redux';
import {authReducer} from './auth-reducer/auth-reducer';
import {offersReducer} from './offers-reducer/offers-reducer';
import {singleOfferReducer} from './single-offer-reducer/single-offer-reducer';

export enum NameSpace {
  User = 'USER',
  Offers = 'OFFERS',
  Offer = 'OFFER',
}

export const rootReducer = combineReducers({
  [NameSpace.User]: authReducer,
  [NameSpace.Offers]: offersReducer,
  [NameSpace.Offer]: singleOfferReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
