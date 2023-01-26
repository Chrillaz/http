async function handleResponse<Data>(response: Response) {
	if (!response.ok) {
		throw new Error(response.statusText);
	}

    let result;

    if (response.headers.get('content-type')?.includes('text/html')) {
        result = await response.text() as Data;
    } else {
        result = await response.json() as Data;
    }

	return {
		ok: response.ok,
		status: response.status,
		statusText: response.statusText,
		data: result,
	};
}

export { handleResponse };
