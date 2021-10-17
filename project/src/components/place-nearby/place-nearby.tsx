import {Offer} from '../../types/offer';
import NextDoorScreen from '../next-door/next-door';

type NearbyScreenProps = {
  offers: Offer[];
  currentOffer: Offer;
}

function PlaceNearbyScreen(props: NearbyScreenProps): JSX.Element {
  const {offers, currentOffer} = props;

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {offers
            .filter((offer) => offer.id !== currentOffer.id)
            .map((offer) => (
              <NextDoorScreen
                key={offer.id}
                offer={offer}
              />
            ))
            .slice(0, 3)}
        </div>
      </section>
    </div>
  );
}

export default PlaceNearbyScreen;
