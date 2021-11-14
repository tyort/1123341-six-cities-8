import browserHistory from '../../browser-history';
import {Middleware} from 'redux';
import {RootState} from '../../store/root-reducer';
import {ActionName} from '../../const';

export const redirect: Middleware<unknown, RootState> =
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === ActionName.RedirectToRoute) {
          browserHistory.push(action.payload);
        }
        return next(action);
      };
