import { handleResponse } from '../src/response';

describe('response', () => {
    const mockJson = {
		key: 'value',
	};

	const mockHtml = '<!DOCKTYPE><html></html>';

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

	const mockSuccessJsonResponse = {
		ok: true,
		status: 200,
		headers: new Headers({
			'Content-Type': 'application/json',
		}),
		json: async () => mockJson,
	} as Response;

	const mockSuccessTextResponse = {
		ok: true,
		status: 200,
		headers: new Headers({
			'Content-Type': 'text/html',
		}),
		text: async () => mockHtml,
	} as Response;

	const mockFailureResponse = {
		ok: false,
		status: 500,
		statusText: 'Request Failed',
	} as Response;

	test('Valid json response', async () => {
		const response = await handleResponse(mockSuccessJsonResponse);

		expect(response.data).toBeDefined();
		expect(response.data).toEqual(mockJson);
	});

	test('Valid text response', async () => {
		const response = await handleResponse(mockSuccessTextResponse);

		expect(response.data).toBeDefined();
		expect(response.data).toEqual(mockHtml);
	});

	test('It throws when response is not ok', async () => {
		try {
			await handleResponse(mockFailureResponse);
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
					await handleResponse(response);
				} catch (error) {
					expect(error).toBeInstanceOf(TypeError);
				}
			}
		};

		await awaitLoop();
	});
});
