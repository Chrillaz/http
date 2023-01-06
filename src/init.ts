import { interceptor, publisher } from './interceptor';
import { InitConfig } from './types';
import { get, post, put, _delete } from './verbs';

function http(config: InitConfig) {
	const interceptors = interceptor();

	return {
		get: get(config, publisher(interceptors)),
		put: put(config, publisher(interceptors)),
		post: post(config, publisher(interceptors)),
		delete: _delete(config, publisher(interceptors)),
		interceptor: interceptors,
	};
}

export { http as create };
