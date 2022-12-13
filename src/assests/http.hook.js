import { useCallback, useState } from "react";

export const useHttp = () => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const request = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = {
        "Content-Type": "application/json",
        "Accept-Language": "en-En",
      }
    ) => {
      try {
        const response = await fetch(url, { method, body, headers });

        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        const data = await response.json();
        setLoaded(true);
        return data;
      } catch (e) {
        setError(true);
        throw e;
      }
    },
    []
  );

  return { request, error, setError, loaded, setLoaded };
};
