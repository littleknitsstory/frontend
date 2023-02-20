import { useState, useEffect } from "react";

interface BaseProps {
  url: "MENU" | "PRODUCTS" | "ARTICLES" | "SUBSCRIBE" | "CONTACTS";
}

interface GetProps {
  method: "GET";
  body?: never;
  lang: string;
  slug?: string;
  isFormReady?: never;
  query?: {
    limit: number;
    offset: number;
  }
}

interface PostProps {
  method: "POST";
  body: {
    [key: string]: string
  };
  lang?: string;
  slug?: string;
  isFormReady: boolean;
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
  postData?: {[key: string]: string[]} 
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

export const useFetch = <T = unknown>({ url, method, lang, body, slug, query, isFormReady }: Props): FetchReturn<T> => {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<ErrorType | undefined>()
  const [postData, setPostData] = useState<{[key: string]: string[]}>()

  // settings params for each method
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
  }

  const fetchData = async () => {
    setLoading(true)

    const fullURL = `${baseURL}${URLS[url]}${slug ? slug : ""}`
    let endPoint = ""
    if (query) {
      endPoint = `?offset=${query.offset}&limit=${query.limit}`
    }

    try {
      if (method === "POST" && !isFormReady) return /* stop if form isn't submitted */

      const response: Response = await fetch(`${fullURL}${endPoint}`, {
        method: method,
        ...params
      })

      if (!response.ok) {
        setError({status: response.status, text: response.statusText})
        setData(undefined)
        const data = await response.json()
        setPostData(data)
      } else {
        const data: T = await response.json()
        setError(undefined)
        setData(data)
        setPostData(data as {[key: string]: string[]})
        }
    } catch (error) {
        setError({text: "Something went wrong"})
      }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [url, lang, query?.limit, slug, isFormReady])
  return {data, loading, error, postData}
}

export function useGet<T>({ url, method, lang, query, slug }: BaseProps & GetProps): FetchReturn<T> {
    return useFetch({ url, method, lang, query, slug});
}

export function usePost<T>({ url, method, body, isFormReady}: BaseProps & PostProps): FetchReturn<T> {
    return useFetch({ url, method, body, isFormReady });
}


