import { HttpResponse } from "./types";

export const unknwonError = 'Unknown Error.';

type ErrorWithMessage = {
	message: string;
};

class HttpError {
    message: string;
    constructor(message: string) {
        this.message = message;
    }
}

function errorWithMessage(error: unknown): error is ErrorWithMessage {
	return (
		typeof error === 'object' &&
		error != null &&
		'message' in error &&
		typeof (error as Record<string, unknown>).message === 'string'
	);
}

function isHttpError(error: unknown): error is HttpError {
    return error instanceof HttpError;
}

async function tryCatch<Data = unknown>(
	promise: Promise<HttpResponse<Data>>
): Promise<HttpError | Data> {
	try {
		const { data } = await promise;

		return data;
	} catch (error) {
        let message = unknwonError;
		if (errorWithMessage(error)) {
			message = error.message;
		}

		return Promise.resolve(
			new HttpError(message)
		);
	}
}

export { tryCatch, isHttpError, HttpError };
