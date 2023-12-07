import { toArray } from '@joktec/core';
import { pre } from '@typegoose/typegoose';
import { get } from 'lodash';
import { Aggregate, PipelineStage, PopulateOptions } from 'mongoose';
import { MongoHelper } from './mongo.helper';

type IPopulateOptions = string | PopulateOptions;

function combinePopulateMatch(
  populates: IPopulateOptions | IPopulateOptions[],
  virtualMatch: object,
): PopulateOptions[] {
  return toArray<IPopulateOptions>(populates).map<PopulateOptions>(populate => {
    if (typeof populate === 'string') {
      populate = { path: populate, match: {} } as PopulateOptions;
    }
    populate.match = Object.assign({}, populate.match, virtualMatch);
    return populate;
  });
}

function preSave<T extends object>() {
  return pre<T>('save', function (next) {
    ['_id', '__v', 'createdAt', 'updatedAt', '__t'].map(path => {
      if (this[path]) delete this[path];
    });
    next();
  });
}

function preBase<T extends object>() {
  return pre<T>(
    [
      'find',
      'findOne',
      'findOneAndUpdate',
      'count',
      'countDocuments',
      'estimatedDocumentCount',
      'updateMany',
      'updateOne',
      'deleteOne',
      'findOneAndDelete',
      'deleteMany',
    ],
    function (next) {
      // Intercept options
      if (this.getOptions()) {
        const options = this.getOptions();
        if (options.sort) options.sort = MongoHelper.parseSort(options.sort);
        if (options.projection) options.projection = MongoHelper.parseProjection(options.projection as any);
        this.setOptions(options);
      }

      // Intercept filter
      if (this.getFilter()) {
        const newFilter = MongoHelper.parseFilter(this.getFilter());
        this.setQuery(newFilter);
      }

      // Intercept update
      if (this.getUpdate()) {
        const omitKeys = ['_id', '__v', 'createdAt', 'updatedAt', '__t'];
        const newUpdate = MongoHelper.flatten(this.getUpdate(), omitKeys);
        this.setUpdate(newUpdate);
      }

      // Intercept populate
      const populatedPaths = this.getPopulatedPaths();
      if (populatedPaths.length) {
        populatedPaths.forEach(path => {
          const virtual = this.model.schema.virtuals[path];
          const virtualMatch = Object.assign({}, get(virtual, 'options.match'), get(virtual, 'options.options.match'));
          const populateOptions = this.mongooseOptions().populate[path];
          const populates = combinePopulateMatch(populateOptions, virtualMatch);
          this.populate(populates);
        });
      }
      next();
    },
    { document: false, query: true },
  );
}

function preAggregate<T extends object>() {
  return pre<Aggregate<T>>('aggregate', function (next) {
    const pipelines: PipelineStage[] = [];
    while (this.pipeline().length) pipelines.push(this.pipeline().shift());
    pipelines.map(pipeline => {
      if ('$lookup' in pipeline) {
        if (!pipeline.$lookup.pipeline?.length) {
          delete pipeline.$lookup.pipeline;
        }
      }
      this.pipeline().push(pipeline);
    });
    next();
  });
}

export function buildMiddleware<T extends object>(): ClassDecorator[] {
  return [preSave<T>(), preBase<T>(), preAggregate<T>()];
}