


export interface ApiError{
    message:string;
    errorCode:string
}

export interface BaseResponse{
    success:boolean;
    result:Object;
    error: ApiError | null
}