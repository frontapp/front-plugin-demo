import { Company } from './Company';

export interface Contact {
	id?: string;
	fields: {
		'Full Name': string;
		Title?: string;
		Email?: string;
		Phone?: string;
		Company?: string[];
		Role?: string[];
		companyDetails?: Company;
	}
}
