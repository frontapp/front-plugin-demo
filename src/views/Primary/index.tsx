import React, { useEffect, useState } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { Tabs } from 'front-plugin-components-library';

import './styles.scss';
import ThisConversationTab from "./ThisConversationTab";

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

const Primary: React.FC = () => {
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
			</div>
			<Tabs tabs={tabs} onClick={onTabClick} isSelected={selectedTab} />
			<Switch>
				<Route exact path="/primary">
					<ThisConversationTab />
				</Route>
				<Route path="/primary/search">
					All tab view here
				</Route>
			</Switch>
		</div>
	);
};

export default Primary;
