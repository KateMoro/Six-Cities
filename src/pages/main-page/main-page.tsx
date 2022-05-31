import Header from '../../components/header/header';
import Locations from '../../components/locations/locations';
import Map from '../../components/map/map';
import PlaceCard from '../../components/place-card/place-card';
import PlacesSorting from '../../components/places-sorting/places-sorting';
import { useAppSelector } from '../../hooks';
import { sorting } from '../../utils';

function MainPage(): JSX.Element {
  const { offers, city, sortType } = useAppSelector((state) => state.offers);
  const filteredOffers = offers.filter((offer) => offer.city.name === city);
  const sortedOffers = sorting(filteredOffers, sortType);

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Locations />

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{filteredOffers.length} places to stay in {city}</b>
              <PlacesSorting />
              <div className="cities__places-list places__list tabs__content">
                {
                  sortedOffers.map((offer) => <PlaceCard key={offer.id} {...offer} />)
                }
              </div>
            </section>
            <div className="cities__right-section">
              <Map offers={sortedOffers} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
