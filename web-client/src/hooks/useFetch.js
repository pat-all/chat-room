import { useState, useCallback } from "react";

const useFetch = () => {
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = { "Content-type": "application/json" }
    ) => {
      setFetching(true);
      try {
        if (body) {
          body = JSON.stringify(body);
        }
        const response = await fetch(url, { method, body, headers });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        setFetching(false);
        return data;
      } catch (e) {
        setFetching(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );
  const clearError = useCallback(() => {
    setError(null);
  }, []);
  return { request, isFetching, error, clearError };
};

export default useFetch;
