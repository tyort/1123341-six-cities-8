export enum ActionName {
  ChangeCity = 'offers/changeCity',
}

export type ChangeCityActionType = {
  type: ActionName.ChangeCity;
  payload: string;
};

export type ActionsType = ChangeCityActionType;
