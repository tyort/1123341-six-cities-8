import browserHistory from '../../browser-history';
import {Middleware} from 'redux';
import {reducer} from '../reducer';
import {ActionName} from '../../types/action';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action) => {

        if (action.type === ActionName.RedirectToRoute) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
