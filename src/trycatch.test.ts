import { isHttpError, tryCatch } from './trycatch';
import http from './index';
jest.mock('http');

describe('trycatch', () => {
	const successResponse = {
		ok: true,
		status: 200,
		statusText: '',
		data: {
			key: 'value',
		},
	};

	const errorResponse = new Error('Something went wrong');
	const unknownResponse = 'Unknown error';

	http.get = jest
		.fn()
		.mockImplementationOnce(() => Promise.resolve(successResponse))
		.mockImplementationOnce(() => Promise.reject(errorResponse))
		.mockImplementationOnce(() => Promise.reject());

	test('Successfull promise', async () => {
		const response = await tryCatch(http.get('/'));

		expect(response).toEqual(successResponse.data);
		expect(isHttpError(response)).toBeFalsy();
	});

	test('Failing promise with error', async () => {
		const response = await tryCatch(http.get('/'));

        if (isHttpError(response)) {
            expect(response.message).toEqual(errorResponse.message);
        }
	});

	test('Failing promise with unknown error', async () => {
		const response = await tryCatch(http.get('/'));

        if (isHttpError(response)) {
            expect(response.message).toEqual(unknownResponse);
        }
	});
});
