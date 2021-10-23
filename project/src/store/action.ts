import {
  ActionName,
  ChangeCityPayload,
  ChangeSortPayload
} from '../types/action';

// аргументы попадают из диспатча
export const ChangeCityAction = (cityName: ChangeCityPayload) => ({
  type: ActionName.ChangeCity,
  payload: cityName,
} as const);

export const ChangeSortNameAction = (sortName: ChangeSortPayload) => ({
  type: ActionName.ChangeSortName,
  payload: sortName,
} as const);
