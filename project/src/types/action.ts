export enum ActionName {
  ChangeCity = 'offers/changeCity',
  UpdateOffers = 'game/updateOffers',
}

export type ChangeCityActionType = {
  type: ActionName.ChangeCity;
};

export type UpdateOffersActionType = {
  type: ActionName.UpdateOffers;
};

export type ActionsType = ChangeCityActionType | UpdateOffersActionType;
