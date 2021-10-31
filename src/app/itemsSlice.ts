import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Item } from '../interfaces/Item';
import { RootState } from './store';

const createItemMethod = () => Promise.resolve([]);

interface ItemId {
	[key: string]: Item;
}

export interface ItemsIds {
	[key: string]: Item[];
}

export const createItem = createAsyncThunk('items/createItem', async (data, { rejectWithValue, dispatch }) => {
	try {
		return createItemMethod();
	} catch (err) {
		// @ts-ignore
		return rejectWithValue(err.response.data);
	}
});

interface ItemsState {
	entities: Item[],
	itemsIds: ItemId;
	itemsByWorkspaceId: ItemsIds;
}

const initialState: ItemsState = {
	entities: [],
	itemsIds: {},
	itemsByWorkspaceId: {},
};

export const itemsSlice = createSlice({
	name: 'items',
	initialState,
	reducers: {},
	extraReducers: (builder) => {},
});

export const itemsSelector = (state: RootState): Item[] => state.items.entities;
export const itemsByIdsSelector = (state: RootState): ItemId => state.items.itemsIds;
export const itemsByWorkspaceIdSelector = (state: RootState): ItemsIds => state.items.itemsByWorkspaceId;

export default itemsSlice.reducer;
