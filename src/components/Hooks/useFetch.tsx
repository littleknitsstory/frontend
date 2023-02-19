import { useState, useEffect } from "react";

interface BaseProps {
  url: "MENU" | "PRODUCTS" | "ARTICLES" | "SUBSCRIBE" | "CONTACTS";
}

interface GetProps {
  method: "GET";
  body?: never;
  lang: string;
  slug?: string;
  query?: {
    limit: number;
    offset: number;
  }
}

interface PostProps {
  method: "POST";
  body: {};
  lang?: string;
  slug?: string;
  query?: {
    limit: number;
    offset: number;
  }
}

type ConditionalProps = GetProps | PostProps
type Props = BaseProps & ConditionalProps 

export interface ErrorType {
  status?: number;
  text?: string;
}

interface FetchReturn<T> {
  data?: T 
  error?: ErrorType;
  loading?: boolean;
}

export const baseURL = "http://dev.backend.littleknitsstory.com:26363"

enum URLS {
  PRODUCTS = "/api/v1/products/",
  CONTACTS = "/api/v1/contacts/",
  MENU = "/api/v1/menu/",
  SUBSCRIBE = "/api/v1/subscribe/",
  ARTICLES = "/api/v1/posts/",
}

export const useFetch = <T = unknown>({ url, method, lang, body, slug, query }: Props): FetchReturn<T> => {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<ErrorType | undefined>()

  let params: RequestInit  
  switch(method) {
    case "GET":
      params = {
        headers: {
          "Accept-Language": lang
        }
      }
      break
    case "POST": 
      params = {
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)        
      }
      break
  }

  const fetchData = async () => {
    setLoading(true)

    const fullURL = `${baseURL}${URLS[url]}${slug ? slug : ""}`
    let endPoint = ""
    if (query) {
      endPoint = `?offset=${query.offset}&limit=${query.limit}`
    }
    try {
      const response: Response = await fetch(`${fullURL}${endPoint}`, {...params})
      if (!response.ok) {
        setError({status: response.status, text: response.statusText})
        // throw new Error("Something went wrong")
      } else {
        const data: T = await response.json()
        if (data) {
          setData(data)
          setError(undefined)
        }
      }
    } catch (error) {
      
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [url, lang, query?.limit, slug])

  return {data, loading, error}
}

export function useGet<T>({ url, method, lang, query, slug }: BaseProps & GetProps): FetchReturn<T> {
    return useFetch({ url, method, lang, query, slug});
}

export function usePost<T>({ url, method, body}: BaseProps & PostProps): FetchReturn<T> {
    return useFetch({ url, method, body });
}
