async function jsonResponse<Data>(response: Response) {

    if (!response.ok) {
        throw new Error(response.statusText);
    }

	const result = (await response.json()) as Data;

	return {
		ok: response.ok,
		status: response.status,
		statusText: response.statusText,
		data: result,
	};
}

export { jsonResponse };
