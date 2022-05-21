import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoriteOffersAction } from '../../store/api-actions';
import Header from '../../components/header/header';
import FavoritesEmpty from './favorites-empty';
import FavoritesList from './favorites-list';
import Footer from '../../components/footer/footer';

function FavoritesPage(): JSX.Element {
  const { favoriteOffers } = useAppSelector((state) => state.offers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, [dispatch]);

  return (
    <div className="page">
      <Header />
      {
        favoriteOffers.length === 0
          ? <FavoritesEmpty />
          : <FavoritesList favoriteOffers={favoriteOffers} />
      }
      <Footer />
    </div>
  );
}

export default FavoritesPage;
