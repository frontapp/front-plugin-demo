import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import signInReducer from '../views/SignIn/signInSlice';
import itemsReducer from './itemsSlice';

export const store = configureStore({
	reducer: {
		signIn: signInReducer,
		items: itemsReducer,
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
