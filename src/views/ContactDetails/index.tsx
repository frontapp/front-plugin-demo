import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { PageReturnHeader } from '@frontapp/plugin-components';
import { ContactFull } from '../../interfaces/Contact';
import { CompanyFull } from '../../interfaces/Company';
import { displayContact, displayCompany } from '../Primary/ThisConversationTab';
import { useAppSelector } from '../../app/hooks';
import { frontContextSelector } from '../../app/frontContextSlice';
import { getCompaniesList, getContactsList } from '../../utils/airtableUtils';

import './styles.scss';

interface ParamTypes {
	id: string;
}

export interface ContactDetailsProps {}

const ContactDetails:React.FC<ContactDetailsProps> = () => {
	const { goBack } = useHistory();
	const { id } = useParams<ParamTypes>();
	const frontContext = useAppSelector(frontContextSelector);
	const [contact, setContact] = useState<ContactFull>();
	const [company, setCompany] = useState<CompanyFull>();
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
		const selectedContact = contacts?.find(contact => contact.id === id);
		const selectedCompany = companies?.find(company => selectedContact?.fields?.Company?.includes(company?.id as string));
		setContact(selectedContact);
		setCompany(selectedCompany);
	}, [contacts, companies, id]);

	const onGoBack = () => {
		goBack();
	};

	return (
		<>
			<div className="details-header">
				<PageReturnHeader onReturnClick={onGoBack} label="Contact details" />
			</div>
			<div className="details-main-info">
				{displayContact(contact?.fields)}
				{displayCompany(company?.fields)}
			</div>
		</>
	);
};

export default ContactDetails;
