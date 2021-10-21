import {
  ActionName,
  ChangeCityActionType
} from '../types/action';

export const incrementMistake = (cityName: string): ChangeCityActionType => ({
  type: ActionName.ChangeCity,
  payload: cityName,
});
