import {ActionName, ActionsType} from '../../types/action';
import {SingleOfferState} from '../../types/state';

const initialState: SingleOfferState = {
  comments: [],
  nearbyOffers: [],
};

const singleOfferReducer = (state = initialState, action: ActionsType): SingleOfferState => {
  switch (action.type) {
    case ActionName.LoadComments: {
      const {comments} = action.payload;
      return {...state, comments};
    }

    case ActionName.LoadNearby: {
      const {nearbyOffers} = action.payload;
      return {...state, nearbyOffers};
    }

    default:
      return state;
  }
};

export {singleOfferReducer};
