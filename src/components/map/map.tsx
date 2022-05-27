import { useEffect, useRef } from 'react';
import { OfferType } from '../../types/offer';
import { MarkerUrl } from '../../const';
import { useAppSelector } from '../../hooks';
import useMap from '../../hooks/useMap';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: OfferType[];
}

function Map(props: MapProps): JSX.Element {
  const { selectedOfferId } = useAppSelector((state) => state.offers);
  const { offers } = props;
  const { location } = offers[0].city;
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: MarkerUrl.Default,
    iconSize: [27, 39],
    iconAnchor: [14, 39],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: MarkerUrl.Current,
    iconSize: [27, 39],
    iconAnchor: [14, 39],
  });

  useEffect(() => {
    const markerGroup = leaflet.layerGroup();

    if (map) {
      markerGroup.addTo(map);

      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: offer.id === selectedOfferId ? currentCustomIcon : defaultCustomIcon,
          })
          .addTo(markerGroup);
      });

      map.flyTo(
        [location.latitude, location.longitude], location.zoom,
      );
    }

    return () => {
      if (map) {
        markerGroup.remove();
      }
    };
  }, [map, offers, defaultCustomIcon, currentCustomIcon, selectedOfferId, location.latitude, location.longitude, location.zoom]);

  return (
    <section
      className="cities__map map"
      style={{ height: '100%' }}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
