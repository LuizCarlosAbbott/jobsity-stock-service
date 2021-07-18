// import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { Stock } from './interface';

@Injectable()
export class StockService {
  apiStockURL = 'https://stooq.com:443/q/l/?f=sd2t2ohlcvn&h&e=csv&s=';
  findByQuery(query: string): Promise<Stock> {
    const options: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        'content-type': 'text/csv; charset=utf-8',
      },
      url: String(this.apiStockURL + query),
    };

    return axios(options)
      .then(({ data }) => {
        return this.convertCsvToJson(data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  private convertCsvToJson(csfFile: string): Stock {
    const jsonObject = {};
    const splittedArray = csfFile.split('\r\n');
    const keyArray = splittedArray[0].split(',');
    const valueArray = splittedArray[1].split(',');

    keyArray.forEach((key, index) => {
      jsonObject[key] = valueArray[index];
    });

    return jsonObject as Stock;
  }
}
