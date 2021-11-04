import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Primary from '../views/Primary';
import ItemDetails from '../views/ContactDetails';
import ItemCreation from '../views/ContactCreation';
import Settings from '../views/Settings';
import SignIn from '../views/SignIn';

import Front from '@frontapp/plugin-sdk';
import { useAppDispatch } from './hooks';
import { setFrontContext } from './frontContextSlice';

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const subscription = Front.contextUpdates.subscribe(newContext => dispatch(setFrontContext(newContext)));
		return () => subscription.unsubscribe();
	}, []);

	return (
		<Router>
			<Switch>
				<Route path="/create">
					<ItemCreation />
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
