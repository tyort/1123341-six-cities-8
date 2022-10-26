import PlaceCardComponent from './PlaceCard';

function PlacesList({ offers, screen }) {
  const currentClasses =
    screen === 'MainScreen'
      ? 'cities__places-list places__list tabs__content'
      : 'favorites__places';

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
