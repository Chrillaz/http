export type BaseUrl = string;

export interface RequestConfig extends RequestInit {}

export interface InitConfig extends RequestConfig {
	baseUrl: BaseUrl;
}

export interface HttpResponse<Data> extends Partial<Response> {
	data: Data;
}

export interface Publisher {
	request: (config: RequestConfig) => RequestConfig;
	response: (response: Response) => Response;
}

export type Interceptor = { [K in keyof Publisher]: Publisher[K] | null };
