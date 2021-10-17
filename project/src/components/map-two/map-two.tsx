import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useState, useRef, useEffect} from 'react';
import {Offer} from '../../types/offer';

type MapScreenProps = {
  offers: Offer[];
  currentOffer: Offer;
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

function MapScreen(props: MapScreenProps): JSX.Element {
  const {offers, currentOffer} = props;
  const [currentMap, setMap] = useState<leaflet.Map | null>(null);
  const mapRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && currentMap === null) {
      const mapInstance = leaflet.map(mapRef.current, {
        center: {
          lat: currentOffer.coordinate.latitude,
          lng: currentOffer.coordinate.longitude,
        },
        zoom: 12,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(mapInstance);

      setMap(mapInstance);
    }
  }, [mapRef, currentMap, currentOffer]);

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
