import React from 'react';
import { Link } from 'react-router-dom';

export interface ItemCreationProps {}

const ItemCreation:React.FC<ItemCreationProps> = () => {
	return <div>
		Item Creation Page
		<Link to="/items">List of items</Link>
	</div>;
};

export default ItemCreation;
