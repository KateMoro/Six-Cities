import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import Logo from '../logo/logo';
import AuthorizedUser from '../authorized-user/authorized-user';
import UnauthorizedUser from '../unauthorized-user/unauthorized-user';

function Header(): JSX.Element {
  const { authorizationStatus } = useAppSelector((state) => state.user);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {
                authorizationStatus === AuthorizationStatus.Auth ? <AuthorizedUser /> : <UnauthorizedUser />
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
