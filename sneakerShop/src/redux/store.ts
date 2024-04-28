import sneakers from './pizza/slice';
import filter from './filter/slice';
import cart from './cart/slice';
import auth from './auth/slice';
import client from './auth/slice';
import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    sneakers,
    filter,
    cart,
    auth,
    client
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
