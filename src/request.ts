import { jsonResponse } from './response';
import { HttpRequest, InitConfig, Publisher, RequestConfig, RequestMethods } from './types';

function get(publisher: Publisher) {
	return async <Data = unknown>(url: string, config: RequestConfig = {}) => {
		const response = await fetch(
			url,
			publisher.request({
				method: RequestMethods.GET,
				...config,
			})
		);

		return await jsonResponse<Data>(publisher.response(response));
	};
}

function put(publisher: Publisher) {
	return async <Data = unknown>(url: string, config: RequestConfig = {}) => {
		const response = await fetch(
			url,
			publisher.request({
				method: RequestMethods.GET,
				...config,
			})
		);

		return await jsonResponse<Data>(publisher.response(response));
	};
}

function post(publisher: Publisher) {
	return async <Data = unknown>(url: string, config: RequestConfig = {}) => {
		const response = await fetch(
			url,
			publisher.request({
				method: RequestMethods.GET,
				...config,
			})
		);

		return await jsonResponse<Data>(publisher.response(response));
	};
}

function _delete(publisher: Publisher) {
	return async <Data = unknown>(url: string, config: RequestConfig = {}) => {
		const response = await fetch(
			url,
			publisher.request({
				method: RequestMethods.GET,
				...config,
			})
		);

		return await jsonResponse<Data>(publisher.response(response));
	};
}

function request({ baseUrl, ...requestConfig }: InitConfig, verb: HttpRequest) {
	return async <Data = unknown>(path: string, config: RequestConfig = {}) => {
		return await verb<Data>(baseUrl + path, {
			...requestConfig,
			...config,
		});
	};
}

export { request, get, put, post, _delete };
