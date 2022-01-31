import React, { useEffect, useState } from 'react';
import { Switch, Route, useLocation, useHistory, Link } from 'react-router-dom';
import { Tabs, Button } from '@frontapp/plugin-components';
import { ContactFull } from '../../interfaces/Contact';
import { CompanyFull } from "../../interfaces/Company";
import { useAppSelector } from '../../app/hooks';
import { frontContextSelector } from '../../app/frontContextSlice';
import { getCompaniesList, getContactsList } from '../../utils/airtableUtils';

import ThisConversationTab from './ThisConversationTab';
import SearchTab from './SearchTab';

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

export interface PrimaryProps {}

const Primary: React.FC<PrimaryProps> = () => {
	const history = useHistory();
	const location = useLocation();
	const frontContext = useAppSelector(frontContextSelector);
	const [selectedTab, setSelectedTab] = useState(tabs[0].key);
	const [contacts, setContacts] = useState<ContactFull[]>([]);
	const [companies, setCompanies] = useState<CompanyFull[]>([]);

	useEffect(() => {
		// Example of requests. Will be removed after further improvements
		const getCompanies = async () => {
			const companies = await getCompaniesList(frontContext);
			setCompanies(companies);
		}
		const getContacts = async () => {
			const contacts = await getContactsList(frontContext);
			setContacts(contacts);
		}

		frontContext && getCompanies();
		frontContext && getContacts();
	}, [frontContext]);

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
