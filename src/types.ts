export enum RequestMethods {
	GET = 'GET',
	PUT = 'PUT',
	POST = 'POST',
	DELETE = 'DELETE',
}

export type BaseUrl = string;

export type RequestConfig = RequestInit

export interface InitConfig extends RequestConfig {
	baseUrl: BaseUrl;
}

export interface HttpResponse<Data> extends Partial<Response> {
	data: Data;
}

export type HttpRequest = <Data = unknown>(
	url: string,
	config: RequestConfig
) => Promise<HttpResponse<Data>>;

export interface Publisher {
	request: (config: RequestConfig) => RequestConfig;
	response: (response: Response) => Response;
}

export type Interceptor = { [K in keyof Publisher]: Publisher[K] | null };
