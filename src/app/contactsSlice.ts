import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Contact } from '../interfaces/Contact';
import { RootState } from './store';

const createContactMethod = () => Promise.resolve([]);

interface ContactId {
	[key: string]: Contact;
}

export interface ContactsIds {
	[key: string]: Contact[];
}

export const createContact = createAsyncThunk('contacts/createContact', async (data, { rejectWithValue, dispatch }) => {
	try {
		return createContactMethod();
	} catch (err) {
		// @ts-ignore
		return rejectWithValue(err.response.data);
	}
});

interface ContactsState {
	entities: Contact[],
	contactsIds: ContactId;
	contactsByWorkspaceId: ContactsIds;
}

const initialState: ContactsState = {
	entities: [],
	contactsIds: {},
	contactsByWorkspaceId: {},
};

export const contactsSlice = createSlice({
	name: 'contacts',
	initialState,
	reducers: {},
	extraReducers: (builder) => {},
});

export const contactsSelector = (state: RootState): Contact[] => state.contacts.entities;
export const contactsByIdsSelector = (state: RootState): ContactId => state.contacts.contactsIds;
export const contactsByWorkspaceIdSelector = (state: RootState): ContactsIds => state.contacts.contactsByWorkspaceId;

export default contactsSlice.reducer;
