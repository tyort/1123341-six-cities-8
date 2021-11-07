import {createReducer} from '@reduxjs/toolkit';
import {SingleOfferState} from '../../types/state';
import {loadCommentsAction, loadNearbyAction} from '../action';

export const initialState: SingleOfferState = {
  comments: [],
  nearbyOffers: [],
};

const singleOfferReducer = createReducer(initialState, (build) => {
  build
    .addCase(loadCommentsAction, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(loadNearbyAction, (state, action) => {
      state.nearbyOffers = action.payload;
    });
});

export {singleOfferReducer};
