import { interceptor, publisher } from './interceptor';
import { get, post, put, request, _delete } from './request';
import { InitConfig } from './types';

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

export { aggregate } from './aggregate';
export * from './types';
export default { ...http, create };
