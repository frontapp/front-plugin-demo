import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField } from '@frontapp/plugin-components';
import { checkBaseId } from '../../utils/airtableUtils';
import { useAppSelector } from '../../app/hooks';
import { frontContextSelector } from '../../app/frontContextSlice';
import { setBaseId as setBaseIdGlobal } from '../../utils/helpers';

import './styles.scss';

export interface SignInProps {}

const SignIn: React.FC<SignInProps> = () => {
	const history = useHistory();
	const [baseId, setBaseId] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const frontContext = useAppSelector(frontContextSelector);

	const handleSignInClick = async () => {
		const checkStatus = await checkBaseId(frontContext, baseId);

		if (checkStatus) {
			setBaseIdGlobal(baseId);
			history.push('/primary');
		} else {
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
			<Button label="Sign in" className="sign-in-button" onClick={handleSignInClick} />
		</div>
	</div>;
};

export default SignIn;
