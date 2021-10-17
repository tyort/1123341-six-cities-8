import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useRef, useEffect} from 'react';
import {Offer, City} from '../../types/offer';
import useMap from '../../hooks/useMap';
import {currentCustomIcon, defaultCustomIcon} from '../../const';

type MapScreenProps = {
  offers: Offer[];
  city: City;
  hoveredCard: Offer | undefined;
}

function MapScreen(props: MapScreenProps): JSX.Element {
  const {offers, city, hoveredCard} = props;
  const mapRef = useRef<HTMLElement | null>(null); // связываем React c DOM-элементом(куда отрендерить карту)
  const currentMap = useMap(mapRef, city);

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
            hoveredCard !== undefined && offer.id === hoveredCard.id
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(currentMap);
      });
    }
  }, [currentMap, offers, hoveredCard]);


  return (
    <div className="cities__right-section">
      <section
        className="cities__map map"
        style={{height: '700px'}}
        ref={mapRef}
      >
      </section>
    </div>
  );
}

export default MapScreen;
