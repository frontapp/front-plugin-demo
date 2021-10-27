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
