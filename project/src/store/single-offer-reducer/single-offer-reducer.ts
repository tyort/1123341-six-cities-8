import {createReducer} from '@reduxjs/toolkit';
import {SingleOfferState} from '../../types/state';
import {loadCommentsAction, loadCurrentOfferAction, loadNearbyAction} from '../action';
import {Comment} from '../../types/comment';

export const initialState: SingleOfferState = {
  comments: [],
  nearbyOffers: [],
  currentOffer: null,
};

const sortedComments = (comments: Comment[]): Comment[] => comments
  .slice()
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

const singleOfferReducer = createReducer(initialState, (build) => {
  build
    .addCase(loadCommentsAction, (state, action) => {
      state.comments = sortedComments(action.payload);
    })
    .addCase(loadNearbyAction, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(loadCurrentOfferAction, (state, action) => {
      state.currentOffer = action.payload;
    });
});

export {singleOfferReducer};
