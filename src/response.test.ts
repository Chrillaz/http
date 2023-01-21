import { jsonResponse } from '../src/response';

describe('response', () => {
	const typeErrorResponses = [
		{
			ok: true,
			status: 200,
			json: async () => '',
		},
		{
			ok: true,
			status: 200,
			json: async () => 1,
		},
		{
			ok: true,
			status: 200,
			json: async () => {
				'a';
			},
		},
		{
			ok: true,
			status: 200,
			json: async () => [],
		},
	] as Response[];

	const mockJson = {
		key: 'value',
	};

	const mockSuccessResponse = {
		ok: true,
		status: 200,
		json: async () => mockJson,
	} as Response;

	const mockFailureResponse = {
		ok: false,
		status: 500,
		statusText: 'Request Failed',
	} as Response;

	test('Valid response', async () => {
		const response = await jsonResponse(mockSuccessResponse);

		expect(response.data).toBeDefined();
		expect(response.data).toEqual(mockJson);
	});

	test('It throws when response is not ok', async () => {
		try {
			await jsonResponse(mockFailureResponse);
		} catch (error) {
			if (error instanceof Error) {
				expect(error.message).toEqual(mockFailureResponse.statusText);
			}
		}
	});

	test('To recieve TypeError when json() is not a function on Response', async () => {
		const awaitLoop = async () => {
			for (const response of typeErrorResponses) {
				try {
					await jsonResponse(response);
				} catch (error) {
					expect(error).toBeInstanceOf(TypeError);
				}
			}
		};

		await awaitLoop();
	});
});
