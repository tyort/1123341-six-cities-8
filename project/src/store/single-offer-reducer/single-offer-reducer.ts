import {createReducer} from '@reduxjs/toolkit';
import {SingleOfferState} from '../../types/state';
import {loadCommentsAction, loadNearbyAction} from '../action';
import {Comment} from '../../types/comment';

export const initialState: SingleOfferState = {
  comments: [],
  nearbyOffers: [],
};

const sortedComments = (comments: Comment[]): Comment[] => comments
  .slice()
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  .slice(0, 10);

const singleOfferReducer = createReducer(initialState, (build) => {
  build
    .addCase(loadCommentsAction, (state, action) => {
      state.comments = sortedComments(action.payload);
    })
    .addCase(loadNearbyAction, (state, action) => {
      state.nearbyOffers = action.payload;
    });
});

export {singleOfferReducer};
