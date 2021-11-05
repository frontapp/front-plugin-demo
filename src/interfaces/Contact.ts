import { Company } from "./Company";

export interface Contact {
	'Full Name': string;
	Title: string;
	Email: string;
	Phone?: string;
	Role?: string[];
	Company?: string[];
	companyDetails?: Company
}

export interface ContactFull {
	id: string;
	fields: Contact
}
