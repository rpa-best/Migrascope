export interface Response<T> {
    results: T[];
    count: number;
}

export interface QueryType {
    search?: string | null;
    offset?: string;
    limit?: number;
}
