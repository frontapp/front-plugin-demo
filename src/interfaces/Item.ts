export interface Item {
	id: string;
	name?: string;
	column_values?: ItemColumnValue[];
}

export interface ItemColumnValue {
	id?: string;
	title?: string;
	text?: string;
}
