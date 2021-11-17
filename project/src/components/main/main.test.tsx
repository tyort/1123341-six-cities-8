import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import MainScreen from './main';
import {makeFakeOffers, cities} from '../../utils/mocks';

const mockOffers = makeFakeOffers();
const city = cities[1];

describe('Component: MainScreen', () => {
  it('should render "MainScreen" correctly', async () => {
    render(
      <BrowserRouter>
        <MainScreen
          city={city}
          offers={mockOffers}
          renderCard={jest.fn(() => <h1>Fake Offer Card</h1>)}
          renderMap={jest.fn(() => <h1>Fake Map</h1>)}
        />
      </BrowserRouter>,
    );

    expect(screen.getByText(new RegExp(`${mockOffers.length} places to stay in ${city.name}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Fake Offer Card/i)).toBeInTheDocument();
    expect(screen.getByText(/Fake Map/i)).toBeInTheDocument();
  });
});
