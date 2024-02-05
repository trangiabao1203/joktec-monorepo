import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { Category } from '../../models/entities';

@Injectable()
export class CategoryRepo extends MongoRepo<Category, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Category);
  }
}
