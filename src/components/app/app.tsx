import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { isCheckedAuth } from '../../utils';
import { AppRoute } from '../../const';
import Spinner from '../spinner/spinner';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import PrivateRoute from '../private-route/private-route';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import Room from '../../pages/room-page/room-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';

function App(): JSX.Element {
  const { authorizationStatus } = useAppSelector((state) => state.user);
  const { isDataLoaded } = useAppSelector((state) => state.offers);

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <Spinner />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage />}
        />

        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />

        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <FavoritesPage />
            </PrivateRoute>
          }
        />

        <Route
          path={`${AppRoute.Room}/:id`}
          element={<Room />}
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
