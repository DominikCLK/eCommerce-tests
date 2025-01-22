export interface RequestOptions {
  data?: Record<string, unknown>;
  headers?: {
    Authorization: string;
  };
}

export interface RequestData {
  url: string;
  options: RequestOptions;
}
