import {Link} from 'react-router-dom';
import {MouseEvent} from 'react';
import {AuthorizationStatus, AppRoute} from '../../const';
import {useSelector, useDispatch} from 'react-redux';
import {getAuthorizationStatus, getEmail} from '../../store/auth-reducer/selectors';
import {logoutAction} from '../../store/api-actions';

function HeaderUserScreen(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const email = useSelector(getEmail);

  const dispatch = useDispatch();

  const handleLinkClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      {authorizationStatus === AuthorizationStatus.Auth
        ?
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__user-name user__name">{email}</span>
            </Link>
          </li>
          <li className="header__nav-item">
            <Link
              className="header__nav-link"
              to={AppRoute.Main}
              onClick={handleLinkClick}
            >
              <span className="header__signout">Sign out</span>
            </Link>
          </li>
        </ul>
        :
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link
              className="header__nav-link header__nav-link--profile"
              to={AppRoute.SignIn}
            >
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        </ul>}
    </nav>
  );
}

export default HeaderUserScreen;
