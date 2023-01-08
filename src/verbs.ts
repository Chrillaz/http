import { InitConfig, RequestConfig, RequestMethods, RequestRelay } from './types';

function get({ baseUrl, ...config }: InitConfig, relay: RequestRelay) {
	return async <Data = unknown>(path: string, requestConfig?: RequestConfig) => {
		return await relay<Data>(baseUrl + path, {
			method: RequestMethods.GET,
			...config,
			...(requestConfig ? requestConfig : {}),
		});
	};
}

function put({ baseUrl, ...config }: InitConfig, relay: RequestRelay) {
	return async <Data = unknown>(path: string, requestConfig?: RequestConfig) => {
		return await relay<Data>(baseUrl + path, {
			method: RequestMethods.PUT,
			...config,
			...(requestConfig ? requestConfig : {}),
		});
	};
}

function post({ baseUrl, ...config }: InitConfig, relay: RequestRelay) {
	return async <Data = unknown>(path: string, requestConfig?: RequestConfig) => {
		return await relay<Data>(baseUrl + path, {
			method: RequestMethods.POST,
			...config,
			...(requestConfig ? requestConfig : {}),
		});
	};
}

function _delete({ baseUrl, ...config }: InitConfig, relay: RequestRelay) {
	return async <Data = unknown>(path: string, requestConfig?: RequestConfig) => {
		return await relay<Data>(baseUrl + path, {
			method: RequestMethods.DELETE,
			...config,
			...(requestConfig ? requestConfig : {}),
		});
	};
}

export { get, put, post, _delete };
