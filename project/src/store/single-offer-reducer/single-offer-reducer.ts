import {createReducer} from '@reduxjs/toolkit';
import {SingleOfferState} from '../../types/state';
import {loadCommentsAction, loadCurrentOfferAction, loadNearbyAction, setFailedPostAction} from '../action';
import {Comment} from '../../types/comment';

export const initialState: SingleOfferState = {
  comments: [],
  nearbyOffers: [],
  currentOffer: null,
  isPostFailed: false,
};

const sortedComments = (comments: Comment[]): Comment[] => comments
  .slice()
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

const singleOfferReducer = createReducer(initialState, (build) => {
  build
    .addCase(loadCommentsAction, (state, action) => {
      state.comments = sortedComments(action.payload);
      state.isPostFailed = false;
    })
    .addCase(loadNearbyAction, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(loadCurrentOfferAction, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(setFailedPostAction, (state, action) => {
      state.isPostFailed = action.payload;
    });
});

export {singleOfferReducer};
