import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useRef, useEffect} from 'react';
import {Offer} from '../../types/offer';
import useMap from '../../hooks/useMap';
import {currentCustomIcon, defaultCustomIcon} from '../../const';

type MapScreenProps = {
  offers: Offer[];
  currentOffer: Offer;
}

function MapScreen(props: MapScreenProps): JSX.Element {
  const {offers, currentOffer} = props;
  const mapRef = useRef<HTMLElement | null>(null);
  const currentMap = useMap(mapRef, currentOffer.coordinate);

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
            offer.id === currentOffer.id
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(currentMap);
      });
    }
  }, [currentMap, currentOffer, offers]);


  return (
    <section
      className="property__map map"
      style={{height: '700px'}}
      ref={mapRef}
    >
    </section>
  );
}

export default MapScreen;
