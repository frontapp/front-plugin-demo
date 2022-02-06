import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';
import { getBaseId, removeBaseId } from "../utils/helpers";
import { checkBaseId } from "../utils/airtableUtils";


export const fetchUserAuthorized = createAsyncThunk('users/fetchUserAuthorized', async (frontContext: any, { rejectWithValue }) => {
	try {
		const baseId = getBaseId();
		const result = baseId && await checkBaseId(frontContext, baseId);

		return Boolean(result);
	} catch (err: any) {
		return rejectWithValue(err.response.data);
	}
});


interface UsersState {
	authorized: boolean | null; // null - not authorized, true/false - authorized
}

const initialState: UsersState = {
	authorized: null,
};

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setAuthentication(state, action: PayloadAction<boolean | null>) {
			const status = action.payload;
			// remove base id from localstorage if false
			!status && removeBaseId();
			state.authorized = status;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUserAuthorized.fulfilled, (state, { payload }) => {
			state.authorized = payload;
		});
	},
});

export const { setAuthentication } = usersSlice.actions;

export const authorizedSelector = (state: RootState): boolean | null => state.users.authorized;

export default usersSlice.reducer;
