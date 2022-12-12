import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';

// Создаем хранилище
export const store = configureStore({ reducer });
