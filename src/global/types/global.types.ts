import { HttpExceptionOptions } from '@nestjs/common';

export type LoggerLevel = 'info' | 'warn' | 'error' | 'debug';
export type AxiosHttpOptions = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
export type AxiosHeaderOptions = { header: string; value: string };
export type LogMessageOptions = {
  url: string;
  handlerName: string;
  controllerName: string;
  method: string;
  responseTime: number;
  body?: object;
  error?: HttpExceptionOptions;
};
