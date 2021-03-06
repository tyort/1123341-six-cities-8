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
          currentOffer: Offer | undefined,
          screenType: ScreenType,
          offers: Offer[],
          center: City,
        ) => (
          <Map
            currentOffer={screenType === ScreenType.Main ? hoveredCard : currentOffer}
            screenType={screenType}
            offers={offers}
            center={center}
          />
        )}

        renderCard={(offers: Offer[], screenType: ScreenType) => {
          const onCardHover = (hoveredOffer: Offer | undefined): void => {
            screenType === ScreenType.Main && setHoveredCard(hoveredOffer);
          };

          return (
            <OfferCard
              offers={offers}
              screenType={screenType}
              onCardHover={onCardHover}
            />
          );
        }}
      />
    );
  }

  return WithMap;
}

export default withMap;
