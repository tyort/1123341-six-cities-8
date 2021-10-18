import {useState} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import MainScreen from '../main/main';
import FavoritesScreen from '../favorites/favorites';
import LoginScreen from '../login/login';
import PlaceOfferScreen from '../place-offer/place-offer';
import NotFoundScreen from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import {Offer, City} from '../../types/offer';
import withMap from '../../hocs/with-map/with-map';

const MainScreenWrapped = withMap(MainScreen);
const PlaceOfferScreenWrapped = withMap(PlaceOfferScreen);

type AppScreenProps = {
  offers: Offer[];
  city: City;
}

function App(props: AppScreenProps): JSX.Element {
  const {offers, city} = props;
  const [hoveredCard, setHoveredCard] = useState<Offer | undefined>(undefined);

  // в компоненте карточки запускается onCardMainHover
  // Это карточка попадает в стейт
  // Этот стейт надо как-то передать Main
  const onCardMainHover = (card: Offer | undefined): void => {
    let currentCard: Offer | undefined = undefined;
    if (card !== undefined) {
      currentCard = offers.find((offer) =>
        offer.id === card.id,
      );
    }
    setHoveredCard(currentCard);
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainScreenWrapped
            isMainScreen
            offers={offers}
            city={city}
            hoveredCard={hoveredCard}
            onCardMainHover={onCardMainHover}
          />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <FavoritesScreen offers={offers}/>}
          authorizationStatus={AuthorizationStatus.NoAuth}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.SignIn}>
          <LoginScreen/>
        </Route>
        {offers.map((offer) => (
          <Route key={offer.id} exact path={`/offer/${offer.id}`}>
            <PlaceOfferScreenWrapped
              currentOffer={offer}
              offers={offers}
              isMainScreen={false}
            />
          </Route>
        ))}
        <Route>
          <NotFoundScreen/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
