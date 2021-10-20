import React from 'react';
import { Link } from 'react-router-dom';

export interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
	return <div>
		Settings Page<br/>
		<Link to="/items">List of items</Link>
	</div>;
};

export default Settings;
