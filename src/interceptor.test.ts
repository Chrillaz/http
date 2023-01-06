import { interceptor, publisher } from './interceptor';
import { RequestConfig } from './types';

describe('interceptor', () => {
	const mockOriginalRequestObj = {};
	const mockModifyedRequestObj = {
		...mockOriginalRequestObj,
		credentials: 'omit',
	};

	beforeEach(() => jest.restoreAllMocks());

	test('Interceptor returns original config when not assigned', () => {
		const interceptors = interceptor();
		const publishers = publisher(interceptors);

		expect(publishers.request(mockOriginalRequestObj as RequestInit)).toEqual(
			mockOriginalRequestObj
		);

		expect(publishers.response(mockOriginalRequestObj as Response)).toEqual(
			mockOriginalRequestObj
		);
	});

	test('Interceptor modifyes the config when assigned', () => {
		const interceptors = interceptor();
		const publishers = publisher(interceptors);

		interceptors.request = (config: RequestConfig) =>
			({
				credentials: mockModifyedRequestObj.credentials,
				...config,
			} as RequestInit);

		interceptors.response = (response: Response) =>
			({
				credentials: mockModifyedRequestObj.credentials,
				...response,
			} as Response);

		expect(publishers.request(mockOriginalRequestObj as RequestInit)).toEqual(
			mockModifyedRequestObj
		);

		expect(publishers.response(mockOriginalRequestObj as Response)).toEqual(
			mockModifyedRequestObj
		);
	});
});
