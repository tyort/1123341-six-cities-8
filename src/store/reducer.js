import { createReducer } from '@reduxjs/toolkit';
import { changeCity } from './action';

const initialState = {
  currentCity: 'Yaroslavl',
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    const { currentCity } = action.payload;
    state.currentCity = currentCity;
  });
});

export { reducer };
