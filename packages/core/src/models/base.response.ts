import { Field } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Constructor } from './base.dto';

export interface IListResponseDto<T> {
  items: T[];
  totalItems: number;
  totalPage?: number;
  isLastPage?: boolean;
}

export const BaseListResponse = <T>(dto: Constructor<T>): any => {
  class BaseListResponse implements IListResponseDto<T> {
    @Field(() => [dto], { defaultValue: [] })
    @ApiProperty({ type: [dto], default: [] })
    items: T[];

    @Field({ defaultValue: 0 })
    @ApiProperty({ default: 0 })
    totalItems: number;

    @Field({ nullable: true, defaultValue: 0 })
    @ApiPropertyOptional()
    totalPage?: number;

    @Field({ nullable: true, defaultValue: false })
    @ApiPropertyOptional()
    isLastPage?: boolean;
  }

  return BaseListResponse;
};
