import {singleOfferReducer, initialState} from './single-offer-reducer';
import {SingleOfferState} from '../../types/state';
import {loadCommentsAction, loadNearbyAction} from '../action';
import {makeFakeComments, makeFakeOffers} from '../../utils/mocks';
import {Comment} from '../../types/comment';

const sortedComments = (comments: Comment[]): Comment[] => comments
  .slice()
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  .slice(0, 10);

const mockFakeComments = sortedComments(makeFakeComments());
const mockFakeOffers = makeFakeOffers();

describe('Reducer: singleOfferReducer', () => {
  it('without additional parameters should return initial state', () => {
    expect(singleOfferReducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });
  it('should upload the comments for current offer from server', () => {
    const state: SingleOfferState = initialState;
    expect(singleOfferReducer(state, loadCommentsAction(mockFakeComments)))
      .toEqual({...initialState, comments: mockFakeComments});
  });
  it('should upload the nearby offers for current offer from server', () => {
    const state: SingleOfferState = initialState;
    expect(singleOfferReducer(state, loadNearbyAction(mockFakeOffers)))
      .toEqual({...initialState, nearbyOffers: mockFakeOffers});
  });
});

