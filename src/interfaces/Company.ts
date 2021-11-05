export interface Company {
	Company: string;
	Website: string;
	Address: string;
	Industry: string;
	Employees: string;
	Segment: string;
	Renewal: string;
	'Contract Value': number;
	Contacts?: string[];
}

export interface CompanyFull {
	id: string;
	fields: Company
}
