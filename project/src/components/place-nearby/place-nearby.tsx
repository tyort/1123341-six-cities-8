import {Offer} from '../../types/offer';

type NearbyScreenProps = {
  offers: Offer[];
  currentOffer: Offer;
  renderCard: (offer: Offer, isMainScreen: boolean) => JSX.Element;
  isMainScreen: boolean;
}

function PlaceNearbyScreen(props: NearbyScreenProps): JSX.Element {
  const {offers, currentOffer, renderCard, isMainScreen} = props;

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {offers
            .filter((offer) => offer.id !== currentOffer.id)
            .map((offer) => (
              renderCard(offer, isMainScreen)
            ))
            .slice(0, 3)}
        </div>
      </section>
    </div>
  );
}

export default PlaceNearbyScreen;
