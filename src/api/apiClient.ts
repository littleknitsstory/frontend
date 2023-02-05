interface IConfig {
  headers: {
    [key: string]: string;
  };
  baseURL: string;
}

const apiClient = ({ headers, baseURL }: IConfig) => {
  const _headers = { ...headers };
  const _baseURL = baseURL;

  const get = (url: string, params?: RequestInit): Promise<Response> => {
    return fetch(`${_baseURL}/${url}`, {
      method: "GET",
      headers: _headers,
      ...params,
    });
  };

  const post = (url: string, body: unknown) => {
    return fetch(`${_baseURL}/${url}`, {
      method: "POST",
      headers: _headers,
      body: JSON.stringify(body),
    });
  };

  return { get, post };
};

export default apiClient({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "http://dev.backend.littleknitsstory.com:26363",
});
