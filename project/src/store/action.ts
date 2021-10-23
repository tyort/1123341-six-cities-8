import {
  ActionName,
  ChangeCityActionType
} from '../types/action';

// аргументы попадают из диспатча
export const ChangeCityAction = (cityName: string): ChangeCityActionType => ({
  type: ActionName.ChangeCity,
  payload: cityName,
});
