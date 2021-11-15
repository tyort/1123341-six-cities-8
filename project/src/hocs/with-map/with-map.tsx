import {useState} from 'react';
import {ComponentType} from 'react';
import Map from '../../components/map/map';
import OfferCard from '../../components/offer-card/offer-card';
import {Offer} from '../../types/offer';
import {City} from '../../types/city';

type HOCProps = {
  renderMap: (
    currentOffer: Offer | undefined,
    isMainScreen: boolean,
    offers: Offer[],
    center: City,
  ) => void
  renderCard: (offers: Offer[], isMainScreen: boolean) => void
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
          center: City,
        ) => {
          // eslint-disable-next-line no-console
          console.log('renderMap');
          return (
            <Map
              // на карте главной страницы будем перекрашивать актуальный маркер
              currentOffer={isMainScreen ? hoveredCard : currentOffer}
              isMainScreen={isMainScreen}
              offers={offers}
              center={center}
            />
          );
        }}

        renderCard={(offers: Offer[], isMainScreen: boolean) => {
          // eslint-disable-next-line no-console
          console.log('renderCard');

          const cardHoverHandler = (hoveredOffer: Offer | undefined): void => {
            isMainScreen && setHoveredCard(hoveredOffer);
          };

          return (
            <OfferCard
              offers={offers}
              isMainScreen={isMainScreen}
              cardHoverHandler={cardHoverHandler}
            />
          );
        }}
      />
    );
  }

  return WithMap;
}

export default withMap;
