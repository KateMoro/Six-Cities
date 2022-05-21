import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { AppRoute } from '../../const';
import { changeCity } from '../../store/slices/offersSlice';
import { OfferType } from '../../types/offer';
import FavoritesCard from './favorites-card';

type FavoritesListProps = {
  favoriteOffers: OfferType[];
}

function FavoritesList(props: FavoritesListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { favoriteOffers } = props;
  const uniqCitiesList = [...new Set(favoriteOffers.map((offer) => offer.city.name))];

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {
              uniqCitiesList.map((city) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link
                        className="locations__item-link"
                        to={AppRoute.Main}
                        onClick={() => {
                          dispatch(changeCity(city));
                        }}
                      >
                        <span>{city}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {
                      favoriteOffers
                        .filter((offer) => offer.city.name === city)
                        .map((offer) => < FavoritesCard {...offer} key={`${city}-${offer.id}`} />)
                    }
                  </div>
                </li>
              ))
            }
          </ul>
        </section>
      </div>
    </main>
  );
}

export default FavoritesList;
