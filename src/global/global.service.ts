import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { AxiosBuilder } from 'src/utils/axios.builder';
import { AxiosHttpOptions, AxiosHeaderOptions } from './types/global.types';
// import logger from './logger/logger';

@Injectable()
export class GlobalService {
  // private loggerFactory: LoggerFactory;

  axiosCall = async (
    method: AxiosHttpOptions,
    url: string,
    body: object,
    headerOptions?: AxiosHeaderOptions[],
    params?: string,
    urlEncoded?: boolean,
  ): Promise<AxiosResponse> => {
    const axios = new AxiosBuilder()
      .setMethod(method)
      .setUrl(url)
      .setBody(body)
      .setHeaders(headerOptions)
      .setParams(params)
      .enableUrlEncoded(urlEncoded);

    return axios.sendRequest();
  };
}
