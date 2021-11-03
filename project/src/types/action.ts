import {Action} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {State} from '../types/state';

// Action creator теперь можно создать не только объект(действие),
// Но и этот middleware, который в свою очередь возвращает промис.
// Внутри middleware можно разместить код с побочными действиями.
export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

// Чтобы диспатчить экшны из самих компонентов, через mapDispatchToProps
// Интерфейс ThunkAction предусматривает диспатч этого типа
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;

