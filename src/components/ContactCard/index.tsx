import React  from 'react';
import { Link } from 'react-router-dom';
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
	return (
		<Link className='contact-cart-link-wrapper' to={`/items/${id}`}>
			<ItemCard title={contact['Full Name']} width={'100%'} className="contact-card">
				<div className="contact-card-body-line">
					<span className="item-card-body-line-text">{contact['Email']}</span>
				</div>
				<div className="contact-card-body-line">
					<span className="item-card-body-line-text">{contact['Phone']}</span>
				</div>
				<div className="contact-card-body-line">
					<span className="item-card-body-line-text">{contact['Title']}</span>
				</div>
			</ItemCard>
		</Link>
	);
};

export default ContactCard;
