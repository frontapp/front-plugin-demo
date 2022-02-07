import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Primary from './views/Primary';
import ItemDetails from './views/ContactDetails';
import ItemCreation from './views/ContactCreation';
import SignIn from './views/SignIn';
import ProtectedRoute from './components/ProtectedRoute';

import Front from '@frontapp/plugin-sdk';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setFrontContext, frontContextSelector } from './store/frontContextSlice';
import { authorizedSelector } from './store/usersSlice';
import { fetchUserAuthorized } from './store/usersSlice';

import 'react-toastify/dist/ReactToastify.css';

function App() {
	const dispatch = useAppDispatch();
	const frontContext = useAppSelector(frontContextSelector);
	const authorized = useAppSelector(authorizedSelector);

	useEffect(() => {
		frontContext && dispatch(fetchUserAuthorized(frontContext));
	}, [frontContext, dispatch]);

	useEffect(() => {
		const subscription = Front.contextUpdates.subscribe(newContext => dispatch(setFrontContext(newContext)));
		return () => subscription.unsubscribe();
	}, [dispatch]);

	return authorized !== null ? (
		<>
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
					<Route exact path="/">
						{authorized ? <Redirect to="/primary" /> : <SignIn />}
					</Route>
				</Switch>
			</Router>
			<ToastContainer />
		</>
	) : null;
}

export default App;
