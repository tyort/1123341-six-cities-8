import {ComponentType} from 'react';
import OfferCard from '../../components/offer-card/offer-card';
import {Offer} from '../../types/offer';

type HOCProps = {
  renderCard: (offer: Offer, isMainScreen: boolean) => void
};

function withHoveredCard<T>(Component: ComponentType<T>): ComponentType<Omit<T, keyof HOCProps>> {
  // без этого PlaceNearbyScreenWrapped в place-offer потребует пропс renderCard
  type ComponentProps = Omit<T, keyof HOCProps>;

  function WithHoveredCard(props: ComponentProps): JSX.Element {
    return (
      <Component
        {...props as T}
        renderCard={(offer: Offer, isMainScreen: boolean) => (
          // укажем только те пропсы, которые необходимы в offer-card
          <OfferCard
            offer={offer}
            isMainScreen={isMainScreen}
          />
        )}
      />
    );
  }

  return WithHoveredCard;
}

export default withHoveredCard;
