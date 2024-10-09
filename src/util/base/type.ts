export interface ResponseType<T=null> {
  statusCode: number;
  message: string;
  success:boolean
  errors:string[]
  data: T;
}

export interface PaginationResponseType<T> {
  values: T[];
  total: number;
  skip: number;
  take: number;
}
