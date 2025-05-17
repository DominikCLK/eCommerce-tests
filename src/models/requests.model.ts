export interface RequestData {
  url: string;
  options: {
    data?: Record<string, unknown>;
    headers?: { Authorization: string };
  };
}

export interface RequestOptions {
  method: string;
  url: string;
  config: {
    data?: {
      email?: string;
      password?: string;
    };
    headers?: {
      Authorization?: string;
    };
  };
  expectedStatus: number;
  errorMessage: string;
}