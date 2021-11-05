import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Primary from '../views/Primary';
import ItemDetails from '../views/ContactDetails';
import ItemCreation from '../views/ContactCreation';
import Settings from '../views/Settings';
import SignIn from '../views/SignIn';
import { getCompaniesList, getContactsList } from '../utils/airtableUtils';
import { Company } from "../interfaces/Company";
import { Contact } from "../interfaces/Contact";

import Front from '@frontapp/plugin-sdk';
import { useAppDispatch } from './hooks';
import { setFrontContext } from './frontContextSlice';

function App() {
	const [companies, setCompanies] = useState<Company[]>([]);
	const [contacts, setContacts] = useState<Contact[]>([]);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const subscription = Front.contextUpdates.subscribe(newContext => dispatch(setFrontContext(newContext)));
		return () => subscription.unsubscribe();
	}, []);

	useEffect(() => {
		// Example of requests. Will be removed after further improvements
		const getCompanies = async () => {
			const companies = await getCompaniesList();
			setCompanies(companies);
		}
		const getContacts = async () => {
			const contacts = await getContactsList();
			setContacts(contacts);
		}

		getCompanies();
		getContacts();
	}, []);

	const onContactCreate = (createdContacts: Contact[]) => {
		setContacts([...createdContacts, ...contacts])
	}

	return (
		<Router>
			<Switch>
				<Route path="/create">
					<ItemCreation companies={companies} onContactCreate={onContactCreate} />
				</Route>
				<Route path="/items/:id">
					<ItemDetails />
				</Route>
				<Route path="/primary">
					<Primary />
				</Route>
				<Route path="/settings">
					<Settings />
				</Route>
				<Route path="/">
					<SignIn />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
