import {useEffect, useState, MutableRefObject} from 'react';
import {Map, TileLayer} from 'leaflet';
import {City} from '../types/city';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, center: City): Map | null {
  // eslint-disable-next-line no-console
  console.log('useMap');
  const [currentMap, setMap] = useState<Map | null>(null);

  useEffect(() => {
    // 1-ая прорисовка компонента: при mapRef === null && currentMap === null
    // После прорисовки компонента mapRef !== null
    // Срабатывает useEffect, условие if выполняется, срабатывает setMap.
    // 2-ая прорисовка компонента: при mapRef !== null && currentMap !== null
    // После прорисовки компонента данные НЕ меняются
    // useEffect вызывается, условие if НЕ выполняется, setMap НЕ срабатывает
    if (mapRef.current !== null && currentMap === null) {
      // eslint-disable-next-line no-console
      console.log('Прорисовка карты');
      // Создаем объект карты
      const mapInstance = new Map(mapRef.current, {
        center: {
          lat: center.location.latitude,
          lng: center.location.longitude,
        },
        zoom: center.location.zoom,
      });

      // Подключаем определенный слой карты
      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );

      mapInstance.addLayer(layer); // подключаем слой к объекту карты

      setMap(mapInstance);
    }
  }, [mapRef, currentMap, center]);

  return currentMap;
}

export default useMap;
