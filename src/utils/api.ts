import Cookies from "js-cookie";

interface FetchOptions extends RequestInit {
    headers?: Record<string, string>;
}

export async function fetchAPIv1(url: string,
    baseURL: string | undefined = process.env.NEXT_PUBLIC_API_URL_V1,
    options: FetchOptions = {}
) {
    const token = Cookies.get("access_token");

    const headers = {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    options["headers"] = {...options?.headers, ...headers}

    const response = await fetch(`${baseURL}${url}`, {
        ...options,
    });

    return response;
}
