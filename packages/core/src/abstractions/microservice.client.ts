import { Constructor, IBaseRequest, ICondition, IListResponseDto } from '../models';
import { startCase } from 'lodash';
import { cloneInstance, toSingular } from '../utils';
import { ClientProxy } from '@nestjs/microservices';
import { JwtPayload } from '../guards';
import { firstValueFrom } from 'rxjs';

export interface IMicroserviceClientProps<T> {
  dto: Constructor<T>;
  dtoName?: string;
}

export const MicroserviceClient = <T extends Record<string, any>, ID>(props?: IMicroserviceClientProps<T>): any => {
  const dtoName = props.dtoName || props.dto.name;
  const nameSingular = startCase(toSingular(dtoName));

  abstract class Service {
    protected constructor(protected client: ClientProxy) {}

    async findAll(req: IBaseRequest<T>, jwtPayload?: JwtPayload): Promise<IListResponseDto<T>> {
      const result = this.client.send<IListResponseDto<T>>({ cmd: `${nameSingular}.findAll` }, { req, jwtPayload });
      return await firstValueFrom(result);
    }

    async find(req: IBaseRequest<T>, jwtPayload?: JwtPayload): Promise<T[]> {
      const result = this.client.send<T[]>({ cmd: `${nameSingular}.find` }, { req, jwtPayload });
      return await firstValueFrom(result);
    }

    async findOne(id: ID, req: IBaseRequest<T> = {}, jwtPayload?: JwtPayload): Promise<T> {
      const result = this.client.send<T>({ cmd: `${nameSingular}.findOne` }, { id, req, jwtPayload });
      return await firstValueFrom(result);
    }

    async create(entity: Partial<T>, jwtPayload?: JwtPayload): Promise<T> {
      const processEntity: Partial<T> = cloneInstance(entity);
      if (jwtPayload) {
        Object.assign(processEntity, { createdBy: jwtPayload.userId, updatedBy: jwtPayload.userId });
      }
      const result = this.client.send<T>({ cmd: `${nameSingular}.create` }, { entity: processEntity, jwtPayload });
      return await firstValueFrom(result);
    }

    async update(id: ID, entity: Partial<T>, jwtPayload?: JwtPayload): Promise<T> {
      const condition: ICondition<T> = { id };
      const processEntity: Partial<T> = cloneInstance(entity);
      if (jwtPayload) {
        Object.assign(processEntity, { updatedBy: jwtPayload.userId });
      }
      const result = this.client.send<T>(
        { cmd: `${nameSingular}.update` },
        { condition, entity: processEntity, jwtPayload },
      );
      return await firstValueFrom(result);
    }

    async delete(id: ID, jwtPayload?: JwtPayload): Promise<T> {
      const condition: ICondition<T> = { id };
      const result = this.client.send<T>({ cmd: `${nameSingular}.delete` }, { condition, jwtPayload });
      return await firstValueFrom(result);
    }
  }

  return Service;
};