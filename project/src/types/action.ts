export enum ActionName {
  ChangeCity = 'offers/changeCity',
  ChangeSortName = 'offers/changeSortName',
}

//--------------------------------------------------------------------
// Ниже представлены типы значений, полученных при выполнении Action
export type ChangeCityActionType = {
  type: ActionName.ChangeCity;
  payload: string;
};

export type ChangeSortNameActionType= {
  type: ActionName.ChangeSortName;
  payload: string;
};

export type ActionsType =
| ChangeCityActionType
| ChangeSortNameActionType
