import { useAppSelector } from '../../hooks';
import PlaceCard from '../place-card/place-card';

function NearbyPlaces(): JSX.Element {
  const { nearbyOffers } = useAppSelector((state) => state.room);

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {
          nearbyOffers.map((nearbyOffer) => (
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
