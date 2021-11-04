import { Company } from './Company';

export interface Contact {
	'Full Name': string;
	Title: string;
	Email: string;
	Phone?: string;
	Role?: string[];
	companyDetails?: Company;
}
