import {
  ActionName,
  ChangeCityActionType,
  ChangeSortNameActionType
} from '../types/action';

// аргументы попадают из диспатча
export const ChangeCityAction = (cityName: string): ChangeCityActionType => ({
  type: ActionName.ChangeCity,
  payload: cityName,
});

export const ChangeSortNameAction = (sortName: string): ChangeSortNameActionType => ({
  type: ActionName.ChangeSortName,
  payload: sortName,
});
