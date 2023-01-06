import { jsonResponse } from '../src/response';

describe('response', () => {
	const typeErrorResponses = ['', 1, {}, []] as Response[];

	const mockJson = {
		key: 'value',
	};

	const mockSuccessResponse = {
		status: 200,
		json: async () => mockJson,
	} as Response;

	test('Valid response', async () => {
		const response = await jsonResponse(mockSuccessResponse);

		expect(response.data).toBeDefined();
		expect(response.data).toEqual(mockJson);
	});

	test('To recieve TypeError when json() is not a function on Response', async () => {
		const response = async (payload: Response) =>
			jsonResponse(payload).catch((error) => {
				return error;
			});

		const awaitLoop = async () => {
			for (const payload of typeErrorResponses) {
				expect(await response(payload)).toBeInstanceOf(TypeError);
			}
		};

		await awaitLoop();
	});
});
