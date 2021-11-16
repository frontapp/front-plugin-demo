import React, { useEffect, useState } from 'react';
import { SearchableDropdown, ChannelsIcon, SearchableDropdownItem } from "@frontapp/plugin-components";
import { useAppSelector } from "../../../app/hooks";
import { frontContextSelector } from "../../../app/frontContextSlice";
import { Contact, ContactFull } from "../../../interfaces/Contact";
import { Company, CompanyFull } from "../../../interfaces/Company";

import './styles.scss';
import { getCompaniesList, getContactsList } from "../../../utils/airtableUtils";

const displayRow = ({ title, value }: { title: string; value?: any; }) => value ? <>
	<div className="details-section-item-property-name">{title}</div>
	<div className="details-section-item-property-value">{value}</div>
</> : null;

export const displayContact = (contact?: Contact) => {
	return contact ? <div className="details-main-info">
		<div className="details-section-title">{contact['Full Name']}</div>
		{displayRow({ title: 'Email', value: contact.Email })}
		{displayRow({ title: 'Phone', value: contact.Phone })}
		{displayRow({ title: 'Role', value: contact.Role?.join(', ') })}
		{displayRow({ title: 'Title', value: contact.Title })}
	</div> : null;
}

export const displayCompany = (company?: Company) => {
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
	const [contacts, setContacts] = useState<ContactFull[]>([]);
	// all companies per conversation
	const [companies, setCompanies] = useState<CompanyFull[]>([]);
	// all contacts as dropdown options
	const [contactOptions, setContactOptions] = useState<SearchableDropdownItem[]>([]);
	// currently shown contact
	const [selectedContact, selectContact] = useState<ContactFull | null>();

	const handleSelectContact = (option: SearchableDropdownItem) => {
		const item = contacts.find(contact => contact.id === option.key)
		if (item) {
			selectContact(item);
		}
	};

	const getData = async (contactNames: string[]) => {
		// TODO add new values to DB to see real contacts in plugin
		contactNames = ["Leyton Graves","Pierre Smith"]
		const contacts = await getContactsList({'filterByFormula': `OR(${contactNames.map(name => `{Full Name}='${name}'`)})`});
		const companies = await getCompaniesList({'filterByFormula': `OR(${contacts.map((c: any) => `FIND('${c.fields["Full Name"]}', ARRAYJOIN({Contacts}))`)})`});

		setContacts(contacts);
		setCompanies(companies);
	}


	// Takes contact names from Front Conversation
	useEffect(() => {
		if (!frontContext || frontContext.listMessages === undefined) {
			setContacts([]);
			setCompanies([]);
			return;
		}
		frontContext.listMessages().then(r => {
			const allConversationContacts: string[]  = r.results.flatMap(m => [...(m.to.map(t => t.handle)), m.from?.handle, ...(m.cc?.map(c => c.handle) || []), ...(m.bcc?.map(b => b.handle) || [])])
				.filter((value, index, self) => self.indexOf(value) === index);

			return getData(allConversationContacts);
		})
		.catch(() => {
			setContacts([])
			setCompanies([])
		});
	}, [frontContext]);

	useEffect(() => {
		const dropdownOptions = contacts.map(contact => ({ key: contact.id as string, label: contact.fields['Full Name'] }))
		setContactOptions(dropdownOptions);

		dropdownOptions.length ? handleSelectContact(dropdownOptions[0]) : selectContact(null)
	}, [contacts])

	const companiesToBeDisplayed = selectedContact ? companies.filter(c => c?.fields?.Contacts?.includes(selectedContact?.id as string)).map(c => c.fields) : [];

	return <div className="this-conversation-wrapper">
		<div className="this-conversation-header">
			<div className="this-conversation-dropdown">
				<SearchableDropdown
					isRequired={true}
					autoWidth={true}
					onSelectValue={handleSelectContact}
					title="Contact"
					placeholder="Select contact"
					options={contactOptions}
					value={{ key: selectedContact?.id as string, label: selectedContact?.fields['Full Name'] as string }}
					icon={<ChannelsIcon />}
				/>
			</div>
		</div>
		{selectedContact && <div>
			{displayContact(selectedContact.fields)}
			{/* there is a possibility one contact has multiple companies assignment*/}
			{companiesToBeDisplayed.map((c: Company) =>  displayCompany(c))}
		</div>}
	</div>
};

export default ThisConversationTab;
