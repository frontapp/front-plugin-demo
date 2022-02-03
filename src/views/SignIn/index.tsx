import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField } from '@frontapp/plugin-components';
import { checkBaseId } from '../../utils/airtableUtils';
import { setBaseId as setBaseIdGlobal } from '../../utils/helpers';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { frontContextSelector } from '../../store/frontContextSlice';
import { authorizedSelector, setAuthentication } from '../../store/usersSlice';

import './styles.scss';

export interface SignInProps {}

const SignIn: React.FC<SignInProps> = () => {
	const history = useHistory();
	const dispatch = useAppDispatch();
	const [baseId, setBaseId] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const frontContext = useAppSelector(frontContextSelector);
	const authorized = useAppSelector(authorizedSelector);

	useEffect(() => {
		// if authorized = true we will go to main page
		authorized && history.push('/primary');
	}, [authorized]);

	const handleSignInClick = async () => {
		setIsLoading(true);
		const checkStatus = baseId && await checkBaseId(frontContext, baseId);

		if (checkStatus) {
			dispatch(setAuthentication(true));
			setBaseIdGlobal(baseId);
			setIsLoading(false);
		} else {
			setIsLoading(false);
			setErrorMessage('The base id isn\'t correct');
		}
	};

	const handleChangeTextField = (value: string) => {
		setBaseId(value);
		errorMessage.length && setErrorMessage('');
	};

	return <div className="sign-in-wrapper">
		<div className="sign-in-content">
			<TextField label="Airtable Base Id" placeholder="Base Id" onChange={handleChangeTextField} value={baseId} isRequired={true} errorText={errorMessage} />
			<p className="sign-in-description ">Place enter your Airtable Base Id to continue work with the app.</p>
			<Button label="Sign in" className="sign-in-button" onClick={handleSignInClick} isDisabled={isLoading} />
		</div>
	</div>;
};

export default SignIn;
