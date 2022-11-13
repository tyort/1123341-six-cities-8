import { useState } from 'react';
import PlaceCardComponent from './PlaceCard';

function PlacesList({ offers, screen }) {
  const [hoveredOffer, setHoveredOffer] = useState(null);
  // console.log(hoveredOffer);

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

  const handleCardHover = (offer) => {
    setHoveredOffer(offer);
  };

  return (
    <div className={currentClasses}>
      {offers !== null &&
        offers.map((offer) => (
          <PlaceCardComponent
            handleCardHover={handleCardHover}
            screen={screen}
            key={offer.id}
            offer={offer}
          />
        ))}
    </div>
  );
}

export default PlacesList;
