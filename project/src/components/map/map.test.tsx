import {render, waitFor} from '@testing-library/react';
import MapComponent from './map';
import {makeFakeOffer, makeFakeOffers, cities} from '../../utils/mocks';
import { ScreenType } from '../../const';

const city = cities[2];
const offers = makeFakeOffers();
const currentOffer = makeFakeOffer();

describe('Component: MapComponent', () => {
  it('should render Map correctly', async () => {
    const {container} = render(
      <MapComponent
        offers={offers}
        center={city}
        screenType={ScreenType.Main}
        currentOffer={currentOffer}
      />,
    );

    await waitFor(() => {
      expect(container.querySelector('section'))
        .toContainElement(container.querySelector('.leaflet-map-pane'));

      expect(container.querySelectorAll('.leaflet-marker-icon'))
        .toHaveLength(offers.length);
    });
  });
});
