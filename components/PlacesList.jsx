import PlaceCardComponent from './PlaceCard';

function PlacesList({ offers, screen }) {
  let currentClasses;
  switch (screen) {
    case 'MainScreen':
      currentClasses = 'cities__places-list places__list tabs__content';
      break;
    case 'OfferScreen':
      currentClasses = 'near-places__list places__list';
      break;
    default:
      currentClasses = 'favorites__places';
  }

  return (
    <div className={currentClasses}>
      {offers !== null &&
        offers.map((offer) => (
          <PlaceCardComponent screen={screen} key={offer.id} offer={offer} />
        ))}
    </div>
  );
}

export default PlacesList;
