import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useState, useRef, useEffect} from 'react';
import {Offer, City} from '../../types/offer';

type MapScreenProps = {
  offers: Offer[];
  city: City;
  hoveredCard: Offer | undefined;
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
  const {offers, city, hoveredCard} = props;
  const [currentMap, setMap] = useState<leaflet.Map | null>(null);

  // связываем React c DOM-элементом(куда отрендерить карту)
  const mapRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // 1-ая прорисовка компонента: при mapRef.current === null && currentMap === null
    // После прорисовки компонента mapRef.current !== null
    // Срабатывает useEffect, условие if выполняется, срабатывает setMap.
    // 2-ая прорисовка компонента: при mapRef.current !== null && currentMap !== null
    // После прорисовки компонента данные НЕ меняются
    // useEffect вызывается, условие if НЕ выполняется, setMap НЕ срабатывает
    if (mapRef.current !== null && currentMap === null) {
      // Создаем объект карты
      const mapInstance = leaflet.map(mapRef.current, {
        center: {
          lat: city.lat,
          lng: city.lng,
        },
        zoom: city.zoom,
      });

      // Подключаем определенный слой карты
      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(mapInstance); // подключаем слой к объекту карты

      setMap(mapInstance);
    }
  }, [mapRef, currentMap, city]);

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
