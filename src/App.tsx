import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Primary from './views/Primary';
import ItemDetails from './views/ContactDetails';
import ItemCreation from './views/ContactCreation';
import SignIn from './views/SignIn';
import ProtectedRoute from './components/ProtectedRoute';

import Front from '@frontapp/plugin-sdk';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setFrontContext, frontContextSelector } from './store/frontContextSlice';
import { fetchUserAuthorized } from './store/usersSlice';


function App() {
	const dispatch = useAppDispatch();
	const frontContext = useAppSelector(frontContextSelector);

	useEffect(() => {
		frontContext && dispatch(fetchUserAuthorized(frontContext));
	}, [frontContext, dispatch]);

	useEffect(() => {
		const subscription = Front.contextUpdates.subscribe(newContext => dispatch(setFrontContext(newContext)));
		return () => subscription.unsubscribe();
	}, [dispatch]);

	return frontContext ? (
		<Router>
			<Switch>
				<ProtectedRoute path="/create">
					<ItemCreation />
				</ProtectedRoute>
				<ProtectedRoute path="/items/:id">
					<ItemDetails />
				</ProtectedRoute>
				<ProtectedRoute path="/primary">
					<Primary />
				</ProtectedRoute>
				<Route component={SignIn} path="/" />
			</Switch>
		</Router>
	) : null;
}

export default App;
