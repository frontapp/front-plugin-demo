import React, { useEffect, useState } from 'react';
import { Switch, Route, useLocation, useHistory, Link } from 'react-router-dom';
import { Tabs, Button } from 'front-plugin-components-library';
import { ContactFull } from '../../interfaces/Contact';
import { CompanyFull } from "../../interfaces/Company";

import ThisConversationTab from "./ThisConversationTab";
import SearchTab from "./SearchTab";

import './styles.scss';

const tabs = [
	{
		label: 'This conversation',
		key: '/primary'
	},
	{
		label: 'Search',
		key: '/primary/search'
	}
];

export interface PrimaryProps {
	contacts: ContactFull[]
	companies: CompanyFull[]
}

const Primary: React.FC<PrimaryProps> = ({ contacts, companies }) => {
	const history = useHistory();
	const location = useLocation();
	const [selectedTab, setSelectedTab] = useState(tabs[0].key);

	useEffect(() => {
		// Need to setup Tab when we back from Item Details page or from another pages
		setSelectedTab(location.pathname);
	}, []);

	const onTabClick = (tabKey: string) => {
		history.push(tabKey);
		setSelectedTab(tabKey);
	};

	return (
		<div>
			<div className="primary-header">
				<span className="primary-header-text">Items</span>
				<Link to={'/create'} className="primary-header-link">
					<Button variant="tertiary" label="+ Create contact" />
				</Link>
			</div>
			<Tabs tabs={tabs} onClick={onTabClick} isSelected={selectedTab} />
			<Switch>
				<Route exact path="/primary">
					<ThisConversationTab />
				</Route>
				<Route path="/primary/search">
					<SearchTab companies={companies} contacts={contacts} />
				</Route>
			</Switch>
		</div>
	);
};

export default Primary;
