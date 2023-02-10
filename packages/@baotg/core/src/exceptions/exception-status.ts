export enum ExceptionMessage {
  INTERNAL_SERVER_ERROR = 'Critical internal server error occurred!',
}

export enum ExceptionStatus {
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  NOT_ACCEPTABLE = 'NOT_ACCEPTABLE',
  PROXY_AUTHENTICATION_REQUIRED = 'PROXY_AUTHENTICATION_REQUIRED',
  REQUEST_TIMEOUT = 'REQUEST_TIMEOUT',
  TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  NOT_IMPLEMENTED = 'NOT_IMPLEMENTED',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',

  INVALID_CLIENT_CONFIG = 'INVALID_CLIENT_CONFIG',
  MICRO_METHOD_NOT_FOUND = 'MICRO_METHOD_NOT_FOUND',
  MICRO_SERVICE_NOT_FOUND = 'MICRO_SERVICE_NOT_FOUND',
  KEY_WAS_NOT_FOUND = 'KEY_WAS_NOT_FOUND',
  CLIENT_CONNECTION_FAILED = 'CLIENT_CONNECTION_FAILED',
  MONGO_CONNECTION_FAILED = 'MONGO_CONNECTION_FAILED',
  MONGO_DISCONNECTED = 'MONGO_DISCONNECTED',
  OBJECT_ID_INVALID = 'OBJECT_ID_INVALID',

  INVALID_PAYLOAD = 'INVALID_PAYLOAD',
  INVALID_INPUT = 'INVALID_INPUT',
  INVALID_TOKEN = 'INVALID_TOKEN',
  INVALID_ACCOUNT = 'INVALID_ACCOUNT',
  FORBIDDEN_RESOURCE = 'FORBIDDEN_RESOURCE',
}
