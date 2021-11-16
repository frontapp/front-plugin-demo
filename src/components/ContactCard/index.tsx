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
	const onUnattachClick = (key: string) => {
		// TODO some action when click on unattach
		console.log(`${key} clicked`);
	};

	const onCopyLinkClick = (key: string) => {
		/// TODO some action when click on copy link
		console.log(`${key} clicked`);
	};

	const onViewClick = (key: string) => {
		// TODO some action when click view the contact some where
		console.log(`${key} clicked`);
	};

	const menuItems = [
		{
			label: (<div>Unattach contact</div>),
			key: 'Unattach contact',
			onClick: onUnattachClick,
		},
	];

	return (
		<Link className='contact-cart-link-wrapper' to={`/items/${id}`}>
			<ItemCard title={contact['Full Name']} width={'100%'} menuItems={menuItems} className="contact-card">
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
