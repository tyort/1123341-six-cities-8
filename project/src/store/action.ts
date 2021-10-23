import {
  ActionName,
  ChangeCityActionType,
  ChangeSortNameActionType,
  ChangeCityPayload,
  ChangeSortPayload
} from '../types/action';

// аргументы попадают из диспатча
export const ChangeCityAction = (cityName: ChangeCityPayload): ChangeCityActionType => ({
  type: ActionName.ChangeCity,
  payload: cityName,
});

export const ChangeSortNameAction = (sortName: ChangeSortPayload): ChangeSortNameActionType => ({
  type: ActionName.ChangeSortName,
  payload: sortName,
});
