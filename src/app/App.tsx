import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Primary from '../views/Primary';
import ItemDetails from '../views/ContactDetails';
import ItemCreation from '../views/ContactCreation';
import SignIn from '../views/SignIn';
import { getCompaniesList, getContactsList } from '../utils/airtableUtils';
import { CompanyFull } from "../interfaces/Company";
import { ContactFull } from "../interfaces/Contact";

import Front from '@frontapp/plugin-sdk';
import { useAppDispatch } from './hooks';
import { setFrontContext } from './frontContextSlice';

function App() {
	const [companies, setCompanies] = useState<CompanyFull[]>([]);
	const [contacts, setContacts] = useState<ContactFull[]>([]);
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

	const onContactCreate = (createdContacts: ContactFull[]) => {
		setContacts([...createdContacts, ...contacts])
	}

	return (
		<Router>
			<Switch>
				<Route path="/create">
					<ItemCreation companies={companies} onContactCreate={onContactCreate} />
				</Route>
				<Route path="/items/:id">
					<ItemDetails companies={companies} contacts={contacts} />
				</Route>
				<Route path="/primary">
					<Primary />
				</Route>
				<Route path="/">
					<SignIn />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
