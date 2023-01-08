import { interceptor, publisher } from './interceptor';
import { requestInit } from './request';
import { InitConfig } from './types';
import { get, post, put, _delete } from './verbs';

function init(config: InitConfig) {
	const interceptors = interceptor();
	const publishers = publisher(interceptors);
	const relay = requestInit(publishers);

	return {
		get: get(config, relay),
		put: put(config, relay),
		post: post(config, relay),
		delete: _delete(config, relay),
		interceptor: interceptors,
	};
}

export { init };
