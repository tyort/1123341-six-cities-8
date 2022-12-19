import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSortName } from './action';

const initialState = {
  currentCity: 'Yaroslavl',
  sortName: 'Popular',
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const { currentCity } = action.payload;
      state.currentCity = currentCity;
    })
    .addCase(changeSortName, (state, action) => {
      const { sortName } = action.payload;
      state.sortName = sortName;
    });
});

export { reducer };
