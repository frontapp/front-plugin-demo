import React, {useEffect, useMemo, useState} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IconButton, PageReturnHeader, ThreeDotButtonDropdown } from 'front-plugin-components-library';
// import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { ItemsIds } from '../../app/itemsSlice';
import { Item } from '../../interfaces/Item';

import './styles.scss';

interface ParamTypes {
	id: string;
}

export interface ItemDetailsProps {}

const ItemDetails:React.FC<ItemDetailsProps> = () => {
	// const dispatch = useAppDispatch();
	const { goBack } = useHistory();
	const { id } = useParams<ParamTypes>();
	const [item, setItem] = useState<Item>();
	// TODO: change useMemo when will have real data
	const items = useMemo(():ItemsIds  => ({}), []);

	useEffect(() => {
		const currentItemId = parseInt(id);
		console.log('currentItemId', currentItemId);
		// TODO fetch data of item by id
		// dispatch(fetchItemsByIds([currentItemId]));
	}, []);

	useEffect(() => {
		// TODO: remove mocked item data
		setItem({
			id,
			name: 'Name of contact',
			email: 'email@email.com',
			phone: '+380996666666',
			company: {name: 'Company name'},
			role: [{name: 'Role 1'}, {name: 'Role 2'}],
		});
	}, [id, items]);

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
			label: 'Unattach item',
			key: 'Unattach item',
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
				<div className="details-item-name">{item?.name}</div>
				<div className="details-section-title">Country</div>
				<div className="details-section-item-property-name">Country name</div>
				<div className="details-section-item-property-value">{item?.company?.name}</div>
				<div className="details-section-item-property-name">Email</div>
				<div className="details-section-item-property-value">{item?.email}</div>
				<div className="details-section-item-property-name">Phone</div>
				<div className="details-section-item-property-value">{item?.phone}</div>
				<div className="details-section-item-property-name">Roles</div>
				<div className="details-section-item-property-value">{(item?.role || []).map(r => r.name)}</div>
			</div>
		</>
	);
};

export default ItemDetails;
