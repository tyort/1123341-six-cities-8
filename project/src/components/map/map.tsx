import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useRef, useEffect} from 'react';
import {Offer} from '../../types/offer';
import {City} from '../../types/city';
import useMap from '../../hooks/useMap';
import {currentCustomIcon, defaultCustomIcon, ScreenType} from '../../const';

type MapScreenProps = {
  offers: Offer[];
  center: City;
  screenType: ScreenType;
  currentOffer: Offer | undefined;
}

function MapScreen(props: MapScreenProps): JSX.Element {
  // currentOffer - выбранная карточка на главной странице и представленная в place-offer
  const {offers, center, screenType, currentOffer} = props;
  const mapRef = useRef<HTMLElement | null>(null); // связываем React c DOM-элементом(куда отрендерить карту)
  const currentMap = useMap(mapRef, center);
  const addDependence = screenType === ScreenType.Main ? currentOffer : undefined;

  useEffect(() => {
    if (currentMap) {
      // Странно, хоть offers меняется, но, добавив их в зависимости, возникнет ошибка.
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
  }, [currentMap, addDependence]);

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
