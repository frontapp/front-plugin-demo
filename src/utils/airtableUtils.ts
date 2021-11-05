import axios from "axios";
import {getSecret} from "./helpers";

const API_ENDPOINT = 'https://api.airtable.com/v0/appJU5jmW6ndxJrWD/';

const getUserApiKey = () => `Bearer ${getSecret('REACT_APP_API_KEY')}`;

const getHeaders = () => ({
        'Content-Type': 'application/json',
        'Authorization': getUserApiKey()
});

type MethodType = 'get' | 'post';
type DataType = {
    [key: string]: any
}

const requestWrapper = async (url: string, method: MethodType, data?: DataType) => {
    let result;
    if (method === 'get') {
        result = await axios.get(API_ENDPOINT + url, {params: data, headers: getHeaders()})
    } else if (method === 'post') {
        result = await axios.post(API_ENDPOINT + url, data, {headers: getHeaders()})
    }

    return result?.data?.records;
}

export const getCompaniesList = (data?: DataType) => {
    return requestWrapper('Companies', 'get', data);
}

export const getContactsList = (data?: DataType) => {
    return requestWrapper('Contacts', 'get', data);
}
