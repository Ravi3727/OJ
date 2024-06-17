export interface ApiResponse{
    success: boolean;
    message: string;
    isSubmitted?: boolean;
    problems?: Array<String>;
}