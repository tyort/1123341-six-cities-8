import browserHistory from '../../browser-history';
import {Middleware} from 'redux';
import {reducer} from '../offers-reducer/offers-reducer';
import {ActionName} from '../../const';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action) => {
        // Условие выполнится, если экшн это redirectToRoute из store/action
        if (action.type === ActionName.RedirectToRoute) {
          // тогда добавляем URL в browserHistory
          browserHistory.push(action.payload);
        }

        // Передаем дальше по цепочке middlewares
        return next(action);
      };
