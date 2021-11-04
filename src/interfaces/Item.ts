import { Company } from './Company';
import { Role } from './Role';

export interface Items {
	id: string;
	name: string;
	email?: string;
	phone?: string;
	company?: Company;
	role?: Role[];
}
