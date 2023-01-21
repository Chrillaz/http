import { interceptor, publisher } from './interceptor';
import { InitConfig } from './types';
import { request, get, post, put, _delete } from './request';

const interceptors = interceptor();
const publishers = publisher(interceptors);

const http = {
	get: get(publishers),
	put: put(publishers),
	post: post(publishers),
	delete: _delete(publishers),
	interceptors,
};

function create(config: InitConfig) {
	return {
		get: request(config, http.get),
		put: request(config, http.put),
		post: request(config, http.post),
		delete: request(config, http.delete),
	};
}

export * from './types';
export { aggregate } from './aggregate';
export default { ...http, create };
