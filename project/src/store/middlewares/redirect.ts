import browserHistory from '../../browser-history';
import {Middleware} from 'redux';
import {RootState} from '../../store/root-reducer';
import {ActionName} from '../../const';

export const redirect: Middleware<unknown, RootState> =
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
