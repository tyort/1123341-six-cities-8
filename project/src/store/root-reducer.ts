import {combineReducers} from 'redux';
import {authReducer} from './auth-reducer/auth-reducer';
import {offersReducer} from './offers-reducer/offers-reducer';
import {singleOfferReducer} from './single-offer-reducer/single-offer-reducer';

export enum NameSpace {
  user = 'USER',
  offers = 'OFFERS',
  offer = 'OFFER',
}

export const rootReducer = combineReducers({
  [NameSpace.user]: authReducer,
  [NameSpace.offers]: offersReducer,
  [NameSpace.offer]: singleOfferReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
