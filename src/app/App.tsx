import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Primary from '../views/Primary';
import ItemDetail from '../views/ItemDetail';
import ItemCreation from '../views/ItemCreation';
import Settings from '../views/Settings';
import SignIn from '../views/SignIn';

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/create">
					<ItemCreation />
				</Route>
				<Route path="/items/:id">
					<ItemDetail />
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
