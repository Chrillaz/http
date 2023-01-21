import { aggregate } from './aggregate';
import http from './index';
jest.mock('http');

describe('aggregate', () => {
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
		const [
			error,
			data,
		] = await aggregate(http.get('/'));

		expect(data).toEqual({ key: 'value' });
		expect(error).not.toBeDefined();
	});

	test('Failing promise with error', async () => {
		const [
			error,
			data,
		] = await aggregate(http.get('/'));

		expect(error).toEqual(errorResponse.message);
		expect(data).not.toBeDefined();
	});

	test('Failing promise with unknown error', async () => {
		const [
			error,
			data,
		] = await aggregate(http.get('/'));

		expect(error).toEqual(unknownResponse);
		expect(data).not.toBeDefined();
	});
});
