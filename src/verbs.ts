import { InitConfig, Publisher, RequestConfig } from './types';
import { RequestMethods } from './methods';
import { request } from './request';

async function get({ baseUrl, ...config }: InitConfig, publisher: Publisher) {
	return async <Data = unknown>(path: string, requestConfig?: RequestConfig) => {
		return await request<Data>(
			baseUrl + path,
			publisher.request({
				method: RequestMethods.GET,
				...config,
				...(requestConfig ? requestConfig : {}),
			}),
			publisher
		);
	};
}

async function put({ baseUrl, ...config }: InitConfig, publisher: Publisher) {
	return async <Data = unknown>(path: string, requestConfig?: RequestConfig) => {
		return await request<Data>(
			baseUrl + path,
			publisher.request({
				method: RequestMethods.PUT,
				...config,
				...(requestConfig ? requestConfig : {}),
			}),
			publisher
		);
	};
}

async function post({ baseUrl, ...config }: InitConfig, publisher: Publisher) {
	return async <Data = unknown>(path: string, requestConfig?: RequestConfig) => {
		return await request<Data>(
			baseUrl + path,
			publisher.request({
				method: RequestMethods.POST,
				...config,
				...(requestConfig ? requestConfig : {}),
			}),
			publisher
		);
	};
}

async function _delete({ baseUrl, ...config }: InitConfig, publisher: Publisher) {
	return async <Data = unknown>(path: string, requestConfig?: RequestConfig) => {
		return await request<Data>(
			baseUrl + path,
			publisher.request({
				method: RequestMethods.DELETE,
				...config,
				...(requestConfig ? requestConfig : {}),
			}),
			publisher
		);
	};
}

export { get, put, post, _delete };
