# Http

Json REST client.
Provides a wrapper around `window.fetch` which imitates the interface given by Axios.

## Create

First create a module that exports the setup.
in the create function we can define some common configs for every request. All properties are inherited from the `RequestInit` interface except the baseUrl.
example:

```ts
import http from '@chrillaz/http';

const api = http.create({
	baseUrl: 'https://someUrl',
	headers: {
		'Content-Type': 'application/json',
	},
});

export { api };
```

Whith this setup the api can be imported and used like this anywhere in the app.

```ts
import { api } from './your/path/to/api';

type TypeForResponseDataProperty = {};

async function someHttpCall() {
	try {
		const response = await api.get<TypeForResponseDataProperty>('/someUrlPath', {
			// optional, any aditional RequestInit configs or overrides
		});
	} catch (error) {
		// ...
	}
}
```

## Interceptors

All requests and responses can be intercepted before passing/returning the actual request config or response.
Ex within the module where the api variable is exported are a grate place to define these interceptors

```ts
import http, { RequestConfig } from '@chrillaz/http';

const api = http.create({
	baseUrl: 'https://someUrl.com',
	headers: {
		'Content-Type': 'application/json',
	},
});

http.interceptors.request = (config: RequestConfig) => {
	// Do something with the config.
	return config;
};

http.interceptors.response = (response: Response) => {
	// Do something with the response
	return response;
};

export { api };
```

## verbs

Following verbs are supported and exported as stand alone functions to.

```ts
import http from '@chrillaz/http';

http.get(url: string, config: RequestInit);
http.put(url: string, config: RequestInit);
http.post(url: string, config: RequestInit);
http.delete(url: string, config: RequestInit);
```

## utilities

The http module exports a handy utility to provide a common interface for try/catch.
It abstracts the try catch logic and returns a baked tuple of `[string | undefined, responseData | undefined]`.

```ts
import http, { tryCatch } from '@chrillaz/http';

type TypeForResponseDataProperty = {};

const [errorMessage, responseData] = tryCatch<TypeForResponseDataProperty>(
	http.get('https://domain.com/path')
);

if (error) {
    // do this
} else {
    // do that
}
```
