import {useEffect, useState, MutableRefObject} from 'react';
import {Map, TileLayer} from 'leaflet';
import {City} from '../types/city';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, center: City): Map | null {
  const [currentMap, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (currentMap) {
      currentMap.remove();
      setMap(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center]);

  useEffect(() => {
    if (mapRef.current !== null && currentMap === null) {
      const mapInstance = new Map(mapRef.current, {
        center: {
          lat: center.location.latitude,
          lng: center.location.longitude,
        },
        zoom: center.location.zoom,
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );

      mapInstance.addLayer(layer);
      setMap(mapInstance);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef, currentMap]);

  return currentMap;
}

export default useMap;
