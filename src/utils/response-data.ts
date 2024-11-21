export interface ResponseData {
  status_code: number;
  status_message: string;
  message: string;
  data?: any;
  errors?: any;
}

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  UNPROCESSABLE_ENTITY: 422,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};
export const RESPONSE_STATUS_MESSAGE = {
  200: 'OK',
  201: 'Created',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  422: 'Unprocessable Entity',
  409: 'Conflict',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  503: 'Service Unavailable',
};

type ResponseDataProps = {
  status_code: keyof typeof HTTP_STATUS;
  message?: any;
  data?: any;
  errors?: any;
};
export const responseJson = (props: ResponseDataProps): ResponseData => ({
  status_code: HTTP_STATUS[props.status_code],
  status_message: RESPONSE_STATUS_MESSAGE[HTTP_STATUS[props.status_code]],
  message:
    props.message || RESPONSE_STATUS_MESSAGE[HTTP_STATUS[props.status_code]],
  data: props.data,
  errors: props.errors,
});

export const responseCreated = (data: any) => {
  return responseJson({
    status_code: 'CREATED',
    message: 'Success',
    data,
  });
};

export const responseOk = (data: any) => {
  return responseJson({
    status_code: 'OK',
    message: 'Success',
    data,
  });
};

export const responseNotFound = (message: string) => {
  return responseJson({
    status_code: 'NOT_FOUND',
    message,
  });
};

export const responseBadRequest = (errors: any) => {
  return responseJson({
    status_code: 'BAD_REQUEST',
    errors,
  });
};

export const responseUnauthorized = (message: string) => {
  return responseJson({
    status_code: 'UNAUTHORIZED',
    message,
  });
};

export const responseForbidden = (message: string) => {
  return responseJson({
    status_code: 'FORBIDDEN',
    message,
  });
};

export const responseInternalServerError = (message: string) => {
  return responseJson({
    status_code: 'INTERNAL_SERVER_ERROR',
    message,
  });
};

export const responseConflict = (message: string) => {
  return responseJson({
    status_code: 'CONFLICT',
    message,
  });
};

export const responseUnprocessableEntity = (errors: any) => {
  return responseJson({
    status_code: 'UNPROCESSABLE_ENTITY',
    errors,
  });
};

export const responseTooManyRequests = (message: string) => {
  return responseJson({
    status_code: 'TOO_MANY_REQUESTS',
    message,
  });
};

export const responseServiceUnavailable = (message: string) => {
  return responseJson({
    status_code: 'SERVICE_UNAVAILABLE',
    message,
  });
};
