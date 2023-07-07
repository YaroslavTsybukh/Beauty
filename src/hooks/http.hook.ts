import {useState , useCallback } from "react";

type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH'
export type LoadingStatus = 'idle' | 'loading' | 'error'

interface HttpHeaders {
    [key: string]: string
}

interface HttpRequest {
    url: string,
    method?: HttpMethod,
    body?: string | null,
    headers?: HttpHeaders
}

export const useHttp = () => {
    const [status , setStatus] = useState<LoadingStatus>("idle")

    const request = useCallback(async({
                                          url,
                                          method = 'GET',
                                          body = null,
                                          headers = {'Content-type': 'application/json'},
                                      }: HttpRequest
    ) => {
        setStatus("loading")

        try {
            const response = await fetch(url, {method , body , headers})

            if(!response.ok){
                throw new Error(`Could not fetch ${url}, status: ${response.status}`)
            }

            const data = await response.json()

            setStatus('idle')
            return data

        } catch(e) {
            setStatus('error')

            if(e instanceof Error) {
                return e.message
            } else if(typeof e == "string") {
                return e
            }
        }

    },[])

    return {status , request}
}