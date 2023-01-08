export enum RequestMethods {
	GET = 'GET',
	PUT = 'PUT',
	POST = 'POST',
	DELETE = 'DELETE',
}

export type BaseUrl = string;

export interface RequestConfig extends RequestInit {}

export interface InitConfig extends RequestConfig {
	baseUrl: BaseUrl;
}

export type RequestRelay = <Data = unknown>(
	url: string,
	config: RequestConfig
) => Promise<HttpResponse<Data>>;

export interface HttpResponse<Data> extends Partial<Response> {
	data: Data;
}

export interface Publisher {
	request: (config: RequestConfig) => RequestConfig;
	response: (response: Response) => Response;
}

export type Interceptor = { [K in keyof Publisher]: Publisher[K] | null };
