import {Offer} from '../../types/offer';

type NearbyScreenProps = {
  offers: Offer[];
  renderCard: (offers: Offer[], isMainScreen: boolean) => JSX.Element;
  isMainScreen: boolean;
}

function PlaceNearbyScreen(props: NearbyScreenProps): JSX.Element {
  const {offers, renderCard, isMainScreen} = props;

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {renderCard(offers.slice(0, 3), isMainScreen)}
        </div>
      </section>
    </div>
  );
}

export default PlaceNearbyScreen;
