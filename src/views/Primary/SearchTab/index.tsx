import React, { useMemo, useState } from 'react';
import { SearchInput, NoResults } from 'front-plugin-components-library';
import ContactCard from '../../../components/ContactCard';
import { ContactFull, Contact } from '../../../interfaces/Contact';
import { CompanyFull} from '../../../interfaces/Company';

import './styles.scss';

export interface SearchTabProps {
	contacts: ContactFull[];
	companies: CompanyFull[];
}

const SearchTab:React.FC<SearchTabProps> = ({contacts}) => {
	const [searchValue, setSearchValue] = useState<string>('');

	const contactsToDisplay: Contact[] = useMemo(() => {
		return contacts
			.map(({ fields }) => fields)
			.filter(contact => contact['Full Name']?.includes(searchValue) || contact['Email']?.includes(searchValue));
	}, [contacts, searchValue]);

	const onContactsSearch = (itemName: string) => {
		setSearchValue(itemName);
	};

	return <div className="search-tab-wrapper">
		<SearchInput className="search-tab-body-search-input" label="Contact name or email" placeholder="Search by contact name or email" onChange={onContactsSearch} isClearIconNeeded={false} />
		{
			searchValue && (
				<div className="search-tab-body-search-value">
					Results for “{searchValue}”
				</div>
			)
		}
		{
			contactsToDisplay.length > 0 && contactsToDisplay.map((contact:  Contact) => <ContactCard contact={contact} key={contact['Full Name']} />)
		}
		{
			contacts.length === 0 && !!searchValue && <NoResults className="search-tab-body-no-results" />
		}
	</div>
};

export default SearchTab;
