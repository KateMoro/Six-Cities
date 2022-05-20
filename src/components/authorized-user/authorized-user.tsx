import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { getUserEmail } from '../../services/user-email';
import { logoutAction } from '../../store/api-actions';

function AuthorizedUser(): JSX.Element {
  const email = getUserEmail();
  const dispatch = useAppDispatch();

  return (
    <>
      <li className="header__nav-item user">
        <Link
          className="header__nav-link header__nav-link--profile"
          to={AppRoute.Favorites}
        >
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__user-name user__name">{email}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <Link
          className="header__nav-link"
          to={AppRoute.Main}
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(logoutAction());
          }}
        >
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </>
  );
}

export default AuthorizedUser;
