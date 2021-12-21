import React  from 'react';
import { useHistory } from 'react-router-dom';
import {
	ItemCard,
} from '@frontapp/plugin-components';
import { Contact } from '../../interfaces/Contact';

import './styles.scss';

interface ContactCardProps {
	contact: Contact;
	id: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact , id}) => {
	const history = useHistory();

	const goToItem = (id: string) => {
		history.push(`/items/${id}`);
	};

	return (
		<ItemCard title={contact['Full Name']} width={'100%'} className="contact-card" onClick={() => goToItem(id)}>
			{
				contact['Email'] ? <div className="contact-card-body-line">
					<span className="item-card-body-line-text">{contact['Email']}</span>
				</div> : null
			}
			{
				contact['Phone']? <div className="contact-card-body-line">
					<span className="item-card-body-line-text">{contact['Phone']}</span>
				</div> : null
			}
			{
				contact['Title'] ? <div className="contact-card-body-line">
					<span className="item-card-body-line-text">{contact['Title']}</span>
				</div> : null
			}
		</ItemCard>
	);
};

export default ContactCard;
