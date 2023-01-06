async function jsonResponse<Data>(response: Response) {
	const result = (await response.json()) as Data;

	return {
		ok: response.ok,
		status: response.status,
		statusText: response.statusText,
		data: result,
	};
}

export { jsonResponse };
