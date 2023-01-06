import { Interceptor, Publisher, RequestConfig } from './types';

function interceptor(): Interceptor {
	return {
		request: null,
		response: null,
	};
}

function publisher(interceptors: ReturnType<typeof interceptor>): Publisher {
	return {
		request: (payload: RequestConfig) => {
			if (interceptors.request instanceof Function) {
				return interceptors.request(payload);
			}

			return payload;
		},
		response: (payload: Response) => {
			if (interceptors.response instanceof Function) {
				return interceptors.response(payload);
			}

			return payload;
		},
	};
}

export { interceptor, publisher };
