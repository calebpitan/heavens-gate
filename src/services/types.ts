import { ErrorName, ErrorCodeName } from '../utils/exceptions/index';
export interface Payload<T extends { [x: string]: any } | null> {
  data: T;
  success?: boolean;
  modified?: boolean;
  message?: string;
}

export interface ErrorPayload {
  error?: {
    error: ErrorName;
    name: string;
    message: string;
    statusCode: number;
    details: {
      [x: string]: any;
      code: ErrorCodeName;
    };
  };
}

export type PayloadOrError = Payload<{ [x: string]: any }> | ErrorPayload;

export type PayloadData = {
  _id: string;
};
