import {
  changeCityAction,
  changeSortNameAction,
  loadOffersAction
} from '../store/action';

export enum ActionName {
  ChangeCity = 'offers/changeCity',
  ChangeSortName = 'offers/changeSortName',
  LoadOffers = 'offers/loadOffers'
}

export type ChangeCityPayload =
| 'Paris'
| 'Cologne'
| 'Brussels'
| 'Amsterdam'
| 'Hamburg'
| 'Dusseldorf'

export type ChangeSortPayload =
| 'Popular'
| 'Price: low to high'
| 'Price: high to low'
| 'Top rated first'

//--------------------------------------------------------------------
// Ниже представлены типы значений, полученных при выполнении Action
export type ChangeCityActionType = {
  type: ActionName.ChangeCity;
  payload: ChangeCityPayload;
};

export type ChangeSortNameActionType= {
  type: ActionName.ChangeSortName;
  payload: ChangeSortPayload;
};

export type ActionsType =
| ReturnType<typeof changeCityAction>
| ReturnType<typeof changeSortNameAction>
| ReturnType<typeof loadOffersAction>

