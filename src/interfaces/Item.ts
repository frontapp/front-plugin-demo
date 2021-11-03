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

export interface Company {
	Company: string;
	Website: string;
	Address: string;
	Industry: string;
	Employees: string;
	Segment: string;
	Renewal: string;
	'Contract Value': number;
}

export interface Contact {
	'Full Name': string;
	Title: string;
	Email: string;
	Phone?: string;
	Role?: string[];
	companyDetails?: Company;
}
