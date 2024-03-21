export interface Response<T> {
    results: T[];
    count: number;
}

export interface QueryType {
    search?: string;
    offset?: string;
    limit?: number;
}
