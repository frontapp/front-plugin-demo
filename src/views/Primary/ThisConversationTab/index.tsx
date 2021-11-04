import React, { useEffect, useState } from 'react';
import { SearchableDropdown, ChannelsIcon } from "front-plugin-components-library";
import { useAppSelector } from "../../../app/hooks";
import { frontContextSelector } from "../../../app/frontContextSlice";
import { Contact, Company } from "../../../interfaces/Item";
import { SearchableDropdownItem } from "../../../types/SearchableDropdownItem";

import './styles.scss';

const displayRow = ({ title, value }: { title: string; value?: any; }) => value ? <>
	<div className="details-section-item-property-name">{title}</div>
	<div className="details-section-item-property-value">{value}</div>
</> : null;

const displayContact = (contact?: Contact) => {
	return contact ? <div className="details-main-info">
		{displayRow({ title: 'Name', value: contact['Full Name'] })}
		{displayRow({ title: 'Email', value: contact.Email })}
		{displayRow({ title: 'Phone', value: contact.Phone })}
		{displayRow({ title: 'Role', value: contact.Role?.join })}
		{displayRow({ title: 'Title', value: contact.Title })}
	</div> : null;
}

const displayCompany = (company?: Company) => {
	return company ? <div className="details-item-column-values">
		<div className="details-section-title">{company.Company}</div>
		{displayRow({ title: 'Website', value: company.Website })}
		{displayRow({ title: 'Address', value: company.Address })}
		{displayRow({ title: 'Industry', value: company.Industry })}
		{displayRow({ title: 'Employees', value: company.Employees })}
		{displayRow({ title: 'Contract Value', value: company['Contract Value'] })}
		{displayRow({ title: 'Segment', value: company.Segment })}
		{displayRow({ title: 'Contract Renewal Date', value: company.Renewal })}
	</div> : null;
}

const ThisConversationTab = (): JSX.Element => {

	const frontContext = useAppSelector(frontContextSelector);
	// all contacts per conversation
	const [contacts, setContacts] = useState<Contact[]>([]);
	// all contacts as dropdown options
	const [contactOptions, setContactOptions] = useState<SearchableDropdownItem[]>([]);
	// currently shown contact
	const [selectedContact, selectContact] = useState<Contact | null>();

	const handleSelectContact = (option: SearchableDropdownItem) => {
		const item = contacts.find(contact => contact['Full Name'] === option.label)
		if (item) {
			selectContact(item);
		}
	};

	// Takes contact names from Front Conversation
	useEffect(() => {
		if (!frontContext || frontContext.listMessages === undefined) {
			setContacts([]);
			return;
		}
		frontContext.listMessages().then(r => {
			const allConversationContacts: string[]  = r.results.flatMap(m => [...(m.to.map(t => t.handle)), m.from?.handle, ...(m.cc?.map(c => c.handle) || []), ...(m.bcc?.map(b => b.handle) || [])])
				.filter((value, index, self) => self.indexOf(value) === index);

			// TODO fetch real data later using allConversationContacts (array of names)
			const mocked: Contact[] = [
				{
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
				}, {
					"Full Name": "Pierre Smith",
					"Title": "Sales Executive",
					"Email": "pierre@auditlawyer.club",
					"Role": [
						"Influencer"
					],
					companyDetails: {
						"Contract Value": 15000,
						"Renewal": "2020-09-15",
						"Segment": "VIP",
						"Company": "Audit Lawyer",
						"Address": "New York, NY",
						"Website": "https://auditlawyer.club",
						"Industry": "💼 Management Consulting",
						"Employees": "11-50"
					}
				}
			]
			setContacts(mocked);
		})
		.catch(() => {
			setContacts([])
		});
	}, [frontContext]);

	useEffect(() => {
		const dropdownOptions = contacts.map(contact => ({ key: contact['Full Name'], label: contact['Full Name'] }))
		setContactOptions(dropdownOptions);

		dropdownOptions.length ? handleSelectContact(dropdownOptions[0]) : selectContact(null)
	}, [contacts])


	return <div className="this-conversation-wrapper">
		<div className="this-conversation-header">
			<div className="this-conversation-dropdown">
				<SearchableDropdown
					isRequired={true}
					onSelectValue={handleSelectContact}
					title="Contact"
					placeholder="Select contact"
					options={contactOptions}
					value={selectedContact}
					icon={<ChannelsIcon />}
				/>
			</div>
		</div>
		{selectedContact && <div>
			{displayContact(selectedContact)}
			{displayCompany(selectedContact?.companyDetails)}
		</div>}
	</div>
};

export default ThisConversationTab;
