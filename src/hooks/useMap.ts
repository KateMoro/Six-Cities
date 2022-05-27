import { MutableRefObject, useEffect, useState } from 'react';
import { LocationType } from '../types/offer';
import { TileLayer } from '../const';
import leaflet, { Map } from 'leaflet';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, location: LocationType): Map | null {
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {

      const mapInstance = leaflet.map(mapRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        },
        zoom: location.zoom,
      });

      leaflet
        .tileLayer(
          TileLayer.Url,
          {
            attribution: TileLayer.Attribution,
          },
        )
        .addTo(mapInstance);

      setMap(mapInstance);
    }
  }, [mapRef, map, location]);

  return map;
}

export default useMap;
