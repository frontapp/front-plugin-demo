import { Company } from './Company';
import { Role } from './Role';

export interface Item {
	id: string;
	name: string;
	email?: string;
	phone?: string;
	company?: Company;
	role?: Role[];
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
