import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IconButton, PageReturnHeader, ThreeDotButtonDropdown } from '@frontapp/plugin-components';
import { ContactFull } from '../../interfaces/Contact';
import { CompanyFull } from "../../interfaces/Company";
import { displayContact, displayCompany } from '../Primary/ThisConversationTab';

import './styles.scss';

interface ParamTypes {
	id: string;
}

export interface ContactDetailsProps {
	contacts: ContactFull[]
	companies: CompanyFull[]
}

const ContactDetails:React.FC<ContactDetailsProps> = ({contacts, companies}) => {
	const { goBack } = useHistory();
	const { id } = useParams<ParamTypes>();
	const [contact, setContact] = useState<ContactFull>();
	const [company, setCompany] = useState<CompanyFull>();

	useEffect(() => {
		const selectedContact = contacts?.find(contact => contact.id === id);
		const selectedCompany = companies?.find(company => selectedContact?.fields?.Company?.includes(company?.id as string));
		setContact(selectedContact);
		setCompany(selectedCompany);
	}, [contacts, companies, id]);

	const onGoBack = () => {
		goBack();
	};

	const onOpenClick = () => {
		console.log('Open your service clicked');
	};

	const onUnattachClick = () => {
		console.log('Unattach clicked');
	};

	const onCopyLinkClick = () => {
		console.log('Copy clicked');
	};

	const menuItems = [
		{
			label: 'Unattach contact',
			key: 'Unattach contact',
			onClick: onUnattachClick,
		},
	];

	return (
		<>
			<div className="details-header">
				<PageReturnHeader onReturnClick={onGoBack} label="Contact details" />
				<div className="details-header-buttons">
					<ThreeDotButtonDropdown items={menuItems} />
				</div>
			</div>
			<div className="details-main-info">
				{displayContact(contact?.fields)}
				{displayCompany(company?.fields)}
			</div>
		</>
	);
};

export default ContactDetails;
