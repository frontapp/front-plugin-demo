import { getBaseId } from './helpers';
import { CompanyFull } from '../interfaces/Company';
import { ContactFull } from '../interfaces/Contact';
import { HttpResponse, HttpVerbsEnum } from './frontUtils';

const getAPIEndpoint = () => `https://api.airtable.com/v0/${getBaseId()}/`;

const getHeaders = () => ({
	'Content-Type': 'application/json',
});

type DataType = {
	[key: string]: any
}

const requestWrapper = async (frontContext: any, url: string, method: HttpVerbsEnum, data?: DataType | null): Promise<any> => {
	const responce: HttpResponse = await frontContext.relayHttp({ verb: method, url: getAPIEndpoint() + url, body: data, headers: getHeaders() });

	// @ts-ignore
	return responce?.body?.records;
};

export const getCompaniesList = (frontContext: any, query?: string): Promise<CompanyFull[]> => {
	return requestWrapper(frontContext, `Companies${query?.length ? '?' + query : ''}`, HttpVerbsEnum.GET);
}

export const getContactsList = (frontContext: any, query?: string): Promise<ContactFull[]> => {
	return requestWrapper(frontContext,`Contacts${query?.length ? '?' + query : ''}`, HttpVerbsEnum.GET);
}

export const createContact = (frontContext: any, data: ContactFull[]): Promise<ContactFull[]> => {
	return requestWrapper(frontContext,'Contacts', HttpVerbsEnum.POST, {records: data});
}

export const checkBaseId = async (frontContext: any, baseId: string) => {
	// The method do request to check if base id entered correctly
	const { status } = await frontContext.relayHttp({
		verb: HttpVerbsEnum.GET,
		url: `https://api.airtable.com/v0/${baseId}/Contacts`,
		headers: getHeaders(),
	});

	return status === 200;
}
