import { HttpResponse, Publisher, RequestConfig } from './types';
import * as Response from './response';

async function request<Data>(
	path: string,
	config: RequestConfig,
	publisher: Publisher
): Promise<HttpResponse<Data>> {
	const response = await fetch(path, config);
	return await Response.jsonResponse<Data>(publisher.response(response));
}

export { request };
