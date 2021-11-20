import {useRef, FormEvent, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, CityName, getRandomInt, passPattern} from '../../const';
import {loginAction} from '../../store/api-actions';
import {getAuthorizationStatus} from '../../store/auth-reducer/selectors';
import {toast} from 'react-toastify';
import Logo from '../logo/logo';
import { changeCityAction } from '../../store/action';
import { getCurrentCity } from '../../store/offers-reducer/selectors';

function LoginScreen(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const currentCity = useSelector(getCurrentCity);
  const dispatch = useDispatch();

  useEffect(() => {
    const RANDOM_CITY = Object.values(CityName)[getRandomInt(6)];
    dispatch(changeCityAction(RANDOM_CITY));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const formSubmitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null && passPattern.test(passwordRef.current.value)) {
      dispatch(loginAction({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }));
    } else {
      toast.info('Пароль должен содержать хотя бы одну цифру и одну английскую букву');
    }
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <Redirect to={AppRoute.Main} />
    );
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action=""
              onSubmit={formSubmitHandler}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={emailRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  data-testid="email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  data-testid="password"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main}>
                <span>{currentCity?.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
