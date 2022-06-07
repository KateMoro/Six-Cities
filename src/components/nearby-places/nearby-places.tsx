import { useAppSelector } from '../../hooks';
import PlaceCard from '../place-card/place-card';

function NearbyPlaces(): JSX.Element {
  const { roomNearbyOffers } = useAppSelector((state) => state.offers);

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {
          roomNearbyOffers.map((nearbyOffer) => (
            <PlaceCard
              key={`${nearbyOffer.id}-${nearbyOffer.title}`}
              {...nearbyOffer}
            />
          ))
        }
      </div>
    </section>
  );
}

export default NearbyPlaces;
