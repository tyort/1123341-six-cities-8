import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import * as Redux from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import ReviewsScreen from './place-reviews';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeOffer, makeFakeComments} from '../../utils/mocks';
import {AuthorizationStatus} from '../../const';

const mockStore = configureMockStore();
const mockOffer = makeFakeOffer();
const mockComments = makeFakeComments();

describe('Component: ReviewsScreen', () => {
  it('should render "ReviewsScreen" correctly when user authorised', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      OFFER: {comments: mockComments},
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ReviewsScreen
            currentOffer={mockOffer}
          />
        </BrowserRouter>,
      </Provider>,
    );

    mockComments.forEach((comment) => {
      expect(screen.getByText(new RegExp(comment.comment, 'i'))).toBeInTheDocument();
    });
    expect(screen.getByText(/To submit review please make sure to set/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tell how was your stay, what you like and what can be improved/i)).toBeInTheDocument();
  });

  it('should render "ReviewsScreen" correctly when user non-authorised', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth},
      OFFER: {comments: mockComments},
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ReviewsScreen
            currentOffer={mockOffer}
          />
        </BrowserRouter>,
      </Provider>,
    );

    expect(screen.queryByPlaceholderText(/Tell how was your stay, what you like and what can be improved/i)).not.toBeInTheDocument();
  });

  it('should set new comment', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      OFFER: {comments: mockComments},
    });

    const useDispatch = jest.spyOn(Redux, 'useDispatch');

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ReviewsScreen
            currentOffer={mockOffer}
          />
        </BrowserRouter>,
      </Provider>,
    );

    expect(useDispatch).toHaveBeenCalledTimes(1);
  });
});
