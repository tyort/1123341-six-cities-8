import {ComponentType} from 'react';
import Map from '../../components/map/map';
import {Offer, City, Coordinate} from '../../types/offer';

type HOCProps = {
  renderMap: (
    currentOffer: Offer | undefined,
    isMainScreen: boolean,
    offers: Offer[],
    center: City | Coordinate,
  ) => void
};

function withMap<T>(Component: ComponentType<T>): ComponentType<Omit<T, keyof HOCProps>> {
  type ComponentProps = Omit<T, keyof HOCProps>;

  function WithMap(props: ComponentProps): JSX.Element {
    return (
      <Component
        {...props as T}
        renderMap={(
          currentOffer: Offer | undefined,
          isMainScreen: boolean,
          offers: Offer[],
          center: City | Coordinate,
        ) => (
          <Map
            currentOffer={currentOffer}
            isMainScreen={isMainScreen}
            offers={offers}
            center={center}
          />
        )}
      />
    );
  }

  return WithMap;
}

export default withMap;
