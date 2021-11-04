import React, {useEffect, useMemo, useState} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IconButton, PageReturnHeader, ThreeDotButtonDropdown } from 'front-plugin-components-library';
// import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { ContactsIds } from '../../app/contactsSlice';
import { Contact } from '../../interfaces/Contact';
import { displayContact, displayCompany } from '../Primary/ThisConversationTab';

import './styles.scss';

interface ParamTypes {
	id: string;
}

export interface ContactDetailsProps {}

const ContactDetails:React.FC<ContactDetailsProps> = () => {
	// const dispatch = useAppDispatch();
	const { goBack } = useHistory();
	const { id } = useParams<ParamTypes>();
	const [contact, setContact] = useState<Contact>();
	// TODO: change useMemo when will have real data
	const contacts = useMemo(():ContactsIds  => ({}), []);

	useEffect(() => {
		const currentItemId = parseInt(id);
		console.log('currentItemId', currentItemId);
		// TODO fetch data of item by id
		// dispatch(fetchItemsByIds([currentItemId]));
	}, []);

	useEffect(() => {
		// TODO: remove mocked item data
		setContact({
			"Full Name": "Cyril Gantzer",
			"Phone": "8435553692",
			"Title": "Platform Marketing",
			"Email": "cyril@frontapp.com",
			companyDetails: {
				"Contract Value": 12000,
				"Renewal": "2020-12-31",
				"Segment": "Enterprise",
				"Company": "Front",
				"Address": "San Francisco, CA",
				"Website": "https://frontapp.com",
				"Industry": "🖥️ Computer Software",
				"Employees": "51-200"
			}
		});
	}, [id, contacts]);

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
		{
			label: 'Copy link',
			key: 'Copy link',
			onClick: onCopyLinkClick,
		},
	];

	return (
		<>
			<div className="details-header">
				<PageReturnHeader onReturnClick={onGoBack} label="Contact details" />
				<div className="details-header-buttons">
					<IconButton icon="popout" onClick={onOpenClick} />
					<ThreeDotButtonDropdown items={menuItems} />
				</div>
			</div>
			<div className="details-main-info">
				{displayContact(contact)}
				{displayCompany(contact?.companyDetails)}
			</div>
		</>
	);
};

export default ContactDetails;
