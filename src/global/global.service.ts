import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { AxiosBuilder } from 'src/utils/axios.builder';
import { AxiosHttpOptions, AxiosHeaderOptions } from './types/global.types';
import { LoggerFactory } from './logger/logger.factory';

@Injectable()
export class GlobalService {
  private loggerFactory: LoggerFactory;
  constructor() {
    this.loggerFactory = LoggerFactory.getInstance('global-service');
  }
  axiosCall = async (
    method: AxiosHttpOptions,
    url: string,
    body: any,
    headerOptions?: AxiosHeaderOptions[],
    params?: any,
    urlEncoded?: boolean,
    // language?: string,
    // clientId?: string,
    // keyHeader?: string,
  ): Promise<AxiosResponse> => {
    const builder = new AxiosBuilder()
      .setMethod(method)
      .setUrl(url)
      .setBody(body)
      .setHeaders(headerOptions)
      .setParams(params)
      .enableUrlEncoded(urlEncoded);

    return builder.send();
  };
}
