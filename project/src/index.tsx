import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createAPI} from './services/api';
import App from './components/app/app';
import {reducer} from './store/offers-reducer/offers-reducer';
import {requireAuthorization} from './store/action';
import {AuthorizationStatus} from './const';
import {fetchOffersAction, checkAuthAction} from './store/api-actions';
import {ThunkAppDispatch} from './types/action';
import {redirect} from './store/middlewares/redirect';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = createStore(
  reducer,
  composeWithDevTools(
    // Посредник в Redux. В момент между:
    //  1) Мы бросили экшен,
    //  2) Экшн обработал редьюсер.
    // -- можно совершить действие
    applyMiddleware(thunk.withExtraArgument(api)),
    // все экшн store проходят через redirect(middleware)
    applyMiddleware(redirect),
  ),
);

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchOffersAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ToastContainer />
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
