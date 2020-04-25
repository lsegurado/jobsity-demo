export default class ApiHelperBase {
    private apiUrl: string;
    constructor(apiUrl = 'https://reqres.in/api') {
        this.apiUrl = apiUrl;
    }
    fetch<T>(input: RequestInfo, params: any, init?: RequestInit | undefined): Promise<T> {

        let url = new URL(this.apiUrl + input);
        Object.keys(params || {}).forEach(key => url.searchParams.append(key, params[key]));
        return fetch(url.toString(), init)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json() as Promise<T>
            })
    }
}