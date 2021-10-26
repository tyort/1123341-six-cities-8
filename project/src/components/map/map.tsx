import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useRef, useEffect} from 'react';
import {Offer} from '../../types/offer';
import {City} from '../../types/city';
import useMap from '../../hooks/useMap';
import {currentCustomIcon, defaultCustomIcon} from '../../const';

type MapScreenProps = {
  offers: Offer[];
  center: City;
  isMainScreen: boolean;
  currentOffer: Offer | undefined;
}

function MapScreen(props: MapScreenProps): JSX.Element {
  // currentOffer - выбранная карточка на главной странице и представленная в place-offer
  const {offers, center, isMainScreen, currentOffer} = props;
  const mapRef = useRef<HTMLElement | null>(null); // связываем React c DOM-элементом(куда отрендерить карту)
  const currentMap = useMap(mapRef, center);

  useEffect(() => {
    if (currentMap) {
      offers.forEach((offer) => {
        const {coordinate} = offer;
        leaflet
          .marker({
            lat: coordinate.latitude,
            lng: coordinate.longitude,
          })
          .setIcon(
            currentOffer !== undefined && offer.id === currentOffer.id
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(currentMap);
      });
    }

  }, [currentMap, offers, currentOffer]);

  return (
    <section
      className={`${isMainScreen ? 'cities__map' : 'property__map'} map`}
      style={{height: '700px'}}
      ref={mapRef}
    >
    </section>
  );
}

export default MapScreen;
