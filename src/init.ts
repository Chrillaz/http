import { interceptor, publisher } from './interceptor';
import { InitConfig } from './types';
import { get, post, put, _delete } from './verbs';

function init(config: InitConfig) {
	const interceptors = interceptor();
	const publishers = publisher(interceptors);

	return {
		get: get(config, publishers),
		put: put(config, publishers),
		post: post(config, publishers),
		delete: _delete(config, publishers),
		interceptor: interceptors,
	};
}

export { init };
