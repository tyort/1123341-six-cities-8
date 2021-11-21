import {NameSpace} from '../root-reducer';
import {State} from '../../types/state';
import {AuthorizationStatus} from '../../const';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getEmail = (state: State): string => state[NameSpace.User].email;
