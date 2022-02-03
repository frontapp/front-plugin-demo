import React  from 'react';
import {
	Redirect, Route
} from 'react-router-dom';
import { RouteProps } from 'react-router';
import { useAppSelector } from '../../store/hooks';
import { authorizedSelector } from '../../store/usersSlice';

const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
	const authorized = useAppSelector(authorizedSelector);

	return <Route
		{...rest}
		render={({ location }) =>
			authorized ? (
				children
			) : (
				<Redirect
					to={{
						pathname: '/',
						state: { from: location }
					}}
				/>
			)
		}
	/>;
};

export default ProtectedRoute;
