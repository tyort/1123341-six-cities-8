import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import PlaceNearbyScreen from './place-nearby';
import {makeFakeFavoriteOffers} from '../../utils/mocks';

const mockOffers = makeFakeFavoriteOffers();

describe('Component: PlaceNearbyScreen', () => {
  it('should render "PlaceNearbyScreen" when user navigate to "/offer/:offerId" url', async () => {
    render(
      <BrowserRouter>
        <PlaceNearbyScreen
          offers={mockOffers}
          renderCard={jest.fn(() => <h1>Fake Offer Card</h1>)}
        />
      </BrowserRouter>,
    );

    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });
});
