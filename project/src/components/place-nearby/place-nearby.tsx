import { ScreenType } from '../../const';
import {Offer} from '../../types/offer';

const NEARBY_OFFERS_LIMIT = 3;

type NearbyScreenProps = {
  offers: Offer[];
  renderCard: (offers: Offer[], screenType: ScreenType) => JSX.Element;
}

function PlaceNearbyScreen(props: NearbyScreenProps): JSX.Element {
  const {offers, renderCard} = props;

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {renderCard(offers.slice(0, NEARBY_OFFERS_LIMIT), ScreenType.Offer)}
        </div>
      </section>
    </div>
  );
}

export default PlaceNearbyScreen;
