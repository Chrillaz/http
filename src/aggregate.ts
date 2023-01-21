import { HttpResponse } from './types';

type ErrorWithMessage = {
	message: string;
};

function errorWithMessage(error: unknown): error is ErrorWithMessage {
	return (
		typeof error === 'object' &&
		error != null &&
		'message' in error &&
		typeof (error as Record<string, unknown>).message === 'string'
	);
}

async function aggregate<Data = unknown>(
	promise: Promise<HttpResponse<Data>>
): Promise<[string?, Data?]> {
	try {
		const { data } = await promise;

		return [undefined, data];
	} catch (error) {
		if (errorWithMessage(error)) {
			return Promise.resolve([error.message, undefined]);
		}

		return Promise.resolve(['Unknown error', undefined]);
	}
}

export { aggregate };
