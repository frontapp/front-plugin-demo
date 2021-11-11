import React, { useMemo, useState } from 'react';
import { SearchInput, NoResults } from '@frontapp/plugin-components';
import ContactCard from '../../../components/ContactCard';
import { ContactFull } from '../../../interfaces/Contact';
import { CompanyFull} from '../../../interfaces/Company';

import './styles.scss';

export interface SearchTabProps {
	contacts: ContactFull[];
	companies: CompanyFull[];
}

const SearchTab:React.FC<SearchTabProps> = ({contacts}) => {
	const [searchValue, setSearchValue] = useState<string>('');

	const contactsToDisplay: ContactFull[] = useMemo(() => {
		return contacts
			.filter(({ fields }) => fields['Full Name']?.toLowerCase()?.includes(searchValue.toLowerCase()) || fields['Email']?.toLowerCase()?.includes(searchValue.toLowerCase()));
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
			contactsToDisplay.length > 0 && contactsToDisplay.map(({ fields, id }) => <ContactCard contact={fields} key={fields['Full Name']} id={id as string} />)
		}
		{
			contactsToDisplay.length === 0 && !!searchValue && <NoResults className="search-tab-body-no-results" />
		}
	</div>
};

export default SearchTab;
