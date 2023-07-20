import { Express } from 'express';
// eslint-disable-next-line unused-imports/no-unused-imports
import { Multer } from 'multer';

export {
  APP_PIPE,
  APP_FILTER,
  APP_GUARD,
  APP_INTERCEPTOR,
  NestFactory,
  HttpAdapterHost,
  AbstractHttpAdapter,
  REQUEST,
  Reflector,
} from '@nestjs/core';
export {
  ClientsModule,
  MessagePattern,
  RpcException,
  Transport,
  Payload,
  GrpcMethod,
  ClientGrpc,
  ClientProxy,
  EventPattern,
  ClientProxyFactory,
  MicroserviceOptions,
} from '@nestjs/microservices';
export {
  ArgumentMetadata,
  ArgumentsHost,
  applyDecorators,
  Body,
  CallHandler,
  Catch,
  Controller,
  createParamDecorator,
  Delete,
  DynamicModule,
  ExecutionContext,
  FileValidator,
  Get,
  Global,
  Headers,
  HttpStatus,
  INestApplication,
  INestMicroservice,
  Inject,
  Injectable,
  MiddlewareConsumer,
  Module,
  ModuleMetadata,
  NestInterceptor,
  NestMiddleware,
  NestModule,
  OnModuleDestroy,
  OnModuleInit,
  Param,
  PipeTransform,
  Post,
  Put,
  Patch,
  Query as QueryParam,
  Req,
  RequestMethod,
  Res,
  Scope,
  UploadedFile,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  SetMetadata,
  CanActivate,
  Render,
  ExceptionFilter,
  Redirect,
} from '@nestjs/common';
export { ObjectType, Query, Field, Mutation, InputType } from '@nestjs/graphql';
export {
  Processor,
  Process,
  ProcessOptions,
  ProcessorOptions,
  BullModule,
  BullRootModuleOptions,
  InjectQueue,
} from '@nestjs/bull';
export { Queue, QueueOptions, Job, JobOptions } from 'bull';
export { Express, Request, Response, NextFunction } from 'express';
export * from './app';
export { FileInterceptor, FilesInterceptor, FileFieldsInterceptor, MulterModule } from '@nestjs/platform-express';
export type MulterFile = Express.Multer.File;
