import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';
import { getBaseId } from "../utils/helpers";
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
	authorized: boolean;
}

const initialState: UsersState = {
	authorized: false,
};

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setAuthentication(state, action: PayloadAction<boolean>) {
			state.authorized = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUserAuthorized.fulfilled, (state, { payload }) => {
			state.authorized = payload;
		});
	},
});

export const { setAuthentication } = usersSlice.actions;

export const authorizedSelector = (state: RootState): boolean => state.users.authorized;

export default usersSlice.reducer;
