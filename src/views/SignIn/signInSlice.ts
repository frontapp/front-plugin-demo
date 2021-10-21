import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

// Define a type for the slice state
interface SignInState {
	signed: boolean;
}

// Define the initial state using that type
const initialState: SignInState = {
	signed: false,
};

export const signInSlice = createSlice({
	name: 'signIn',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		signIn: (state) => {
			state.signed = true;
		},
		signOut: (state) => {
			state.signed = false;
		},
	},
});

export const { signIn, signOut } = signInSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const signed = (state: RootState) => state.signIn.signed;

export default signInSlice.reducer;
