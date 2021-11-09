import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';
import frontContextReducer from './frontContextSlice';

export const store = configureStore({
	reducer: {
		contacts: contactsReducer,
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
