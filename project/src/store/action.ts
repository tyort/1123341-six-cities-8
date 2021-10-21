import {
  ActionName,
  ChangeCityActionType
} from '../types/action';

export const ChangeCityAction = (cityName: string): ChangeCityActionType => ({
  type: ActionName.ChangeCity,
  payload: cityName,
});
