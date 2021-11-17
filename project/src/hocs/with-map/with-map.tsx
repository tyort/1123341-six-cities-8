import {useState} from 'react';
import {ComponentType} from 'react';
import Map from '../../components/map/map';
import OfferCard from '../../components/offer-card/offer-card';
import {Offer} from '../../types/offer';
import {City} from '../../types/city';
import {ScreenType} from '../../const';

type HOCProps = {
  renderMap: (
    currentOffer: Offer | undefined,
    screenType: ScreenType,
    offers: Offer[],
    center: City,
  ) => void
  renderCard: (offers: Offer[], screenType: ScreenType) => void
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
          screenType: ScreenType,
          offers: Offer[],
          center: City,
        ) => {
          // eslint-disable-next-line no-console
          console.log('renderMap');
          return (
            <Map
              // на карте главной страницы будем перекрашивать актуальный маркер
              currentOffer={screenType === ScreenType.Main ? hoveredCard : currentOffer}
              screenType={screenType}
              offers={offers}
              center={center}
            />
          );
        }}

        renderCard={(offers: Offer[], screenType: ScreenType) => {
          // eslint-disable-next-line no-console
          console.log('renderCard');

          const cardHoverHandler = (hoveredOffer: Offer | undefined): void => {
            screenType === ScreenType.Main && setHoveredCard(hoveredOffer);
          };

          return (
            <OfferCard
              offers={offers}
              screenType={screenType}
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
