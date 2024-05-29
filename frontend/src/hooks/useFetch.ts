import { useState, useEffect, use } from "react";
import { Session } from "next-auth";

function useFetch<ArgType>(
    url: string,
    method: string,
    session: Session | null = null,
    body: string = ""
): {
    data: ArgType | null;
    isPending: boolean;
    error: string | null;
} {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (session) {
            const abortCont = new AbortController(); //abort fetch
            const useAuth = session?.token !== "";
            const headers = useAuth
                ? {
                      "Content-Type": "application/json",
                      "Access-Control-Allow-Origin": "*",
                      Authorization: `Bearer ${session?.token}`,
                  }
                : ({
                      "Content-Type": "application/json",
                      "Access-Control-Allow-Origin": "*",
                  } as HeadersInit);

            let settings: RequestInit;

            if (body !== "") {
                settings = {
                    signal: abortCont.signal,
                    method: method,
                    headers: headers,
                    body: body,
                };
            } else {
                settings = {
                    signal: abortCont.signal,
                    method: method,
                    headers: headers,
                };
            }

            fetch(url, settings)
                .then((res) => {
                    if (!res.ok) {
                        throw Error("Could not fetch data from that resource");
                    }
                    return res.json();
                })
                .then((data) => {
                    setData(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch((err) => {
                    if (err.name === "AbortError") {
                        console.log("fetch aborted");
                    } else {
                        setError(err.message);
                        setIsPending(false);
                    }
                });

            // abort fetch
            return () => abortCont.abort();
        }
    }, [body, method, url, session]); //runs only on reload, and does not depend on other variables except the url

    return { data, isPending, error };
}

export default useFetch;
