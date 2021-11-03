import {MouseEvent} from 'react';
import {useState} from 'react';
import {ComponentType} from 'react';
import Map from '../../components/map/map';
import OfferCard from '../../components/offer-card/offer-card';
import {Offer} from '../../types/offer';
import {City} from '../../types/city';
import {nanoid} from 'nanoid';

type HOCProps = {
  renderMap: (
    currentOffer: Offer | undefined,
    isMainScreen: boolean,
    offers: Offer[],
    center: City,
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

        renderCard={(offer: Offer, isMainScreen: boolean) => {
          // eslint-disable-next-line no-console
          console.log('renderCard');

          const onCardMainHover = (evt: MouseEvent<HTMLElement>): void => {
            isMainScreen && evt.type === 'mouseenter'
              ? setHoveredCard(offer)
              : setHoveredCard(undefined);
          };

          return (
            <OfferCard
              key={nanoid(10)}
              offer={offer}
              isMainScreen={isMainScreen}
              onCardMainHover={onCardMainHover}
            />
          );
        }}
      />
    );
  }

  return WithMap;
}

export default withMap;
