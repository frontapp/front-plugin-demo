import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import signInReducer from '../views/SignIn/signInSlice';
import frontContextReducer from './frontContextSlice';

export const store = configureStore({
	reducer: {
		signIn: signInReducer,
		front: frontContextReducer
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
