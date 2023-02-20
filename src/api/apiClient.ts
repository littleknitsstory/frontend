interface IConfig {
  headers: {
    [key: string]: string;
  };
  baseURL: string;
}

const apiClient = ({ headers, baseURL }: IConfig) => {
  let _headers = { ...headers };
  const _baseURL = baseURL;

  const updateHeaders = (headers: { [key: string]: string }) => {
    _headers = { ..._headers, ...headers };
  };

  const get = (url: string, params?: RequestInit) => {
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

  return { get, post, updateHeaders };
};

export default apiClient({
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "en",
  },
  baseURL: "http://dev.backend.littleknitsstory.com:26363",
});
