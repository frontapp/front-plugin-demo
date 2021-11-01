import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Primary from '../views/Primary';
import ItemDetails from '../views/ItemDetails';
import ItemCreation from '../views/ItemCreation';
import Settings from '../views/Settings';
import SignIn from '../views/SignIn';

import Front from '@frontapp/plugin-sdk';
import { useAppDispatch, useAppSelector } from './hooks';
import { frontContextSelector, setFrontContext } from './frontContextSlice';

function App() {
	const dispatch = useAppDispatch();

	const frontContext = useAppSelector(frontContextSelector);
	const [contacts, setContacts] = useState([] as string[]);

	useEffect(() => {
		const subscription = Front.contextUpdates.subscribe(newContext => dispatch(setFrontContext(newContext)));
		return () => subscription.unsubscribe();
	}, []);

	// TODO add this for fething data for dropdown, so move this to proper page later
	useEffect(() => {
		if (!frontContext || frontContext.listMessages === undefined) {
			setContacts([]);
			return;
		}
		console.log('frontContext.listMessages ',frontContext.listMessages)
		frontContext.listMessages().then(r => {
			const allConversationContacts: string[]  = r.results.flatMap(m => [...(m.to.map(t => t.handle)), m.from?.handle, ...(m.cc?.map(c => c.handle) || []), ...(m.bcc?.map(b => b.handle) || [])])
				.filter((value, index, self) => self.indexOf(value) === index);

			setContacts(allConversationContacts);
		});
	}, [frontContext]);

	console.log(contacts);

	return (
		<Router>
			<Switch>
				<Route path="/create">
					<ItemCreation />
				</Route>
				<Route path="/items/:id">
					<ItemDetails />
				</Route>
				<Route path="/items">
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
