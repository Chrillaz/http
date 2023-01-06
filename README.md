# Http

Provides a wrapper around `window.fetch` which imitates the interface given by Axios.

## Usage

First create a module that exports the setup.
in the create function we can define some common configs for every request. all propertie in RequestInit are valid.
example:

```ts
import { create } from '@chrillaz/http';

const api = create({
	baseUrl: 'https://someUrl',
	headers: {
		'Content-Type': 'application/json',
	},
});

export { api };
```

Whith this setup the api can be imported and used like this.

```ts
import { api } from './your/path/to/api';

async function someHttpCall() {
	try {
		const response = await api.get<TypeForDataProperty>('someUrl', {
			// optional, any aditional RequestInit configs or overrides
		});
	} catch (error) {
		// ...
	}
}
```

# Interceptors

All requests and responses can be intercepted before passing/returning the actual request config or response.
Ex within the module where the api variable is exported are a grate place to define these interceptors

```ts
import { create } from '@chrillaz/http';

const api = create({
	baseUrl: 'https://someUrl',
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptor.request = (config: RequestConfig) => {
	// Do something with the config.
	return config;
};

api.interceptor.response = (response: Response) => {
	// Do something with the response
	return response;
};

export { api };
```

# verbs

Following verbs are supported.

```ts
export const enum RequestMethods {
	GET = 'GET',
	PUT = 'PUT',
	POST = 'POST',
	DELETE = 'DELETE',
}

api.get(url: string, config: RequestInit);
api.put(url: string, config: RequestInit);
api.post(url: string, config: RequestInit);
api.delete(url: string, config: RequestInit);
```
