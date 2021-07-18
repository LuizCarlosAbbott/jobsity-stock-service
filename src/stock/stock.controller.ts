import { Controller, Get, Query } from '@nestjs/common';
import { StockService } from './stock.service';

@Controller()
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  findByQuery(@Query('q') query: string) {
    return this.stockService.findByQuery(query);
  }
}
