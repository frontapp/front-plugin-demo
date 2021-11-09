import axios from "axios";
import {getSecret} from "./helpers";
import { CompanyFull } from "../interfaces/Company";
import { ContactFull } from "../interfaces/Contact";

const API_ENDPOINT = `https://api.airtable.com/v0/${getSecret('REACT_APP_BASE_ID')}/`;

const getUserApiKey = () => `Bearer ${getSecret('REACT_APP_API_KEY')}`;

const getHeaders = () => ({
        'Content-Type': 'application/json',
        'Authorization': getUserApiKey()
});

type MethodType = 'get' | 'post';
type DataType = {
    [key: string]: any
}

const requestWrapper = async (url: string, method: MethodType, data?: DataType | null) => {
    let result;

    if (method === 'get') {
        result = await axios.get(API_ENDPOINT + url, {params: data, headers: getHeaders()})
    } else if (method === 'post') {
        result = await axios.post(API_ENDPOINT + url, data, {headers: getHeaders()})
    }

    return result?.data?.records;
}

export const getCompaniesList = (data?: DataType): Promise<CompanyFull[]> => {
    return requestWrapper('Companies', 'get', data);
}

export const getContactsList = (data?: DataType): Promise<ContactFull[]> => {
    return requestWrapper('Contacts', 'get', data);
}

export const createContact = (data: ContactFull[]): Promise<ContactFull[]> => {
    return requestWrapper('Contacts', 'post', {records: data});
}
