import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

interface ParamTypes {
	id: string;
}

export interface ItemDetailProps {}

const ItemDetail:React.FC<ItemDetailProps> = () => {
	const { id } = useParams<ParamTypes>();
	return (
		<div>
			ItemDetail Page (id: {id})
			<Link to="/items">List of items</Link>
		</div>
	);
};

export default ItemDetail;
