import { HttpResponse, Publisher, RequestConfig } from './types';
import { jsonResponse } from './response';

function requestInit(publisher: Publisher) {
	return async <Data = unknown>(url: string, config: RequestConfig) => {
		const response = await fetch(url, publisher.request(config));
		return await jsonResponse<Data>(publisher.response(response));
	};
}

export { requestInit };
