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
  // eslint-disable-next-line no-console
  console.log('MapScreen');
  // currentOffer - выбранная карточка на главной странице и представленная в place-offer
  const {offers, center, isMainScreen, currentOffer} = props;
  const mapRef = useRef<HTMLElement | null>(null); // связываем React c DOM-элементом(куда отрендерить карту)
  const currentMap = useMap(mapRef, center);

  useEffect(() => {
    if (currentMap) {
      // eslint-disable-next-line no-console
      console.log('Прорисовка маркеров');
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
  }, [currentMap, currentOffer]);

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
