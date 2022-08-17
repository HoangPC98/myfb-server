declare class ResponseDataWithPagination {
    count: number;
    pageNumber: number;
    data: unknown;
}
export declare class GetListResponse {
    statusCode: number;
    message: string;
    data: ResponseDataWithPagination;
}
export {};
