import {Provider} from 'react-redux';
import {render, waitFor} from '@testing-library/react';
import MapComponent from './map';
import {makeFakeOffer, makeFakeOffers, cities} from '../../utils/mocks';
import { ScreenType } from '../../const';
import { configureMockStore } from '@jedmao/redux-mock-store';

const city = cities[2];
const offers = makeFakeOffers();
const currentOffer = makeFakeOffer();
const mockStore = configureMockStore();

const store = mockStore({
  OFFER: {
    nearbyOffers: offers,
  },
});

describe('Component: MapComponent', () => {
  it('should render Map correctly', async () => {
    const {container} = render(
      <Provider store={store}>
        <MapComponent
          offers={offers}
          center={city}
          screenType={ScreenType.Main}
          currentOffer={currentOffer}
        />
      </Provider>,
    );

    await waitFor(() => {
      expect(container.querySelector('section'))
        .toContainElement(container.querySelector('.leaflet-map-pane'));

      expect(container.querySelectorAll('.leaflet-marker-icon'))
        .toHaveLength(offers.length);
    });
  });
});
