import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useRef, useEffect} from 'react';
import {Offer} from '../../types/offer';
import {City} from '../../types/city';
import useMap from '../../hooks/useMap';
import {currentCustomIcon, defaultCustomIcon, ScreenType} from '../../const';
import {getOfferNearbies } from '../../store/single-offer-reducer/selectors';
import { useSelector } from 'react-redux';

type MapScreenProps = {
  offers: Offer[];
  center: City;
  screenType: ScreenType;
  currentOffer: Offer | undefined;
}

function MapScreen(props: MapScreenProps): JSX.Element {
  const {offers, center, screenType, currentOffer} = props;

  const mapRef = useRef<HTMLElement | null>(null);
  const currentMap = useMap(mapRef, center);
  const nearbyOffers = useSelector(getOfferNearbies);
  const setCurrentOffer = screenType === ScreenType.Main ? currentOffer : undefined;

  useEffect(() => {
    if (currentMap) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          })
          .setIcon(
            currentOffer !== undefined && offer.id === currentOffer.id
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(currentMap);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMap, nearbyOffers, setCurrentOffer]);

  return (
    <section
      className={`${screenType===ScreenType.Main ? 'cities__map' : 'property__map'} map`}
      style={{height: '700px'}}
      ref={mapRef}
    >
    </section>
  );
}

export default MapScreen;
