import { CounterProviders, HistogramProviders, Global, Module } from '@baotg/core';
import { HttpModule as NestHttpModule } from '@nestjs/axios';
import { HttpService } from './http.service';
import { HTTP_DURATION_SECONDS_METRIC, HTTP_TOTAL_METRIC, HttpMetricService } from './http.metric';

@Global()
@Module({
  imports: [NestHttpModule],
  providers: [
    HttpService,
    HttpMetricService,
    ...HistogramProviders([{ name: HTTP_DURATION_SECONDS_METRIC, label: ['path'] }]),
    ...CounterProviders([{ name: HTTP_TOTAL_METRIC, label: ['path', 'status', 'statusCode'] }]),
  ],
  exports: [HttpService],
})
export class HttpModule {}
