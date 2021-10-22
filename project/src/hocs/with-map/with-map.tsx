import {useState} from 'react';
import {ComponentType} from 'react';
import Map from '../../components/map/map';
import OfferCard from '../../components/offer-card/offer-card';
import {Offer, City, Coordinate} from '../../types/offer';

type HOCProps = {
  renderMap: (
    currentOffer: Offer | undefined,
    isMainScreen: boolean,
    offers: Offer[],
    center: City | Coordinate,
  ) => void
  renderCard: (offer: Offer, isMainScreen: boolean) => void
};

function withMap<T>(Component: ComponentType<T>): ComponentType<Omit<T, keyof HOCProps>> {
  type ComponentProps = Omit<T, keyof HOCProps>;

  function WithMap(props: ComponentProps): JSX.Element {
    const [hoveredCard, setHoveredCard] = useState<Offer | undefined>(undefined);

    return (
      <Component
        {...props as T}

        renderMap={(
          currentOffer: Offer | undefined, // при прорисовке main, передаем сначала undefined
          isMainScreen: boolean,
          offers: Offer[],
          center: City | Coordinate,
        ) => (
          <Map
            // на карте главной страницы будем перекрашивать актуальный маркер
            currentOffer={isMainScreen ? hoveredCard : currentOffer}
            isMainScreen={isMainScreen}
            offers={offers}
            center={center}
          />
        )}

        renderCard={(offer: Offer, isMainScreen: boolean) => (
          <OfferCard
            offer={offer}
            isMainScreen={isMainScreen}
            onCardMainHover={(card: Offer | undefined): void => {
              if (JSON.stringify(card) !== JSON.stringify(hoveredCard) && isMainScreen) {
                setHoveredCard(card);
              }
            }}
          />
        )}
      />
    );
  }

  return WithMap;
}

export default withMap;
