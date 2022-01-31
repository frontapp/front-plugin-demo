export enum HttpVerbsEnum {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE'
}

export interface HttpRelayRequest {
	/** The HTTP verb to use for the request. */
	verb: HttpVerbsEnum;
	/** The path relative to this application. */
	url: string;
	/** The body of the request. */
	body?: unknown;
	headers?: object;
}

export interface HttpResponse {
	/** HTTP status code */
	status: number;
	/** Body of the response. */
	body: unknown;
}
