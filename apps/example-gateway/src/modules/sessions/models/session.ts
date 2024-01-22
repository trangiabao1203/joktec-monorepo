import { MongoSchema, Prop, Ref, Schema } from '@joktec/mongo';
import { PropType, Severity } from '@typegoose/typegoose';
import { User } from '../../users/models';
import { SessionBrowser, SessionCPU, SessionDevice, SessionEngine, SessionOs } from './session.device';
import { SessionStatus } from './session.enum';

@Schema({ collection: 'sessions', paranoid: true })
export class Session extends MongoSchema {
  @Prop({ required: true })
  tokenId!: string;

  @Prop({ required: true })
  expiresAt!: Date;

  @Prop({ required: true, default: new Date() })
  lastActiveAt!: Date;

  @Prop({ default: null })
  revokedAt?: Date;

  @Prop({})
  userAgent?: string;

  @Prop({})
  ipAddress?: string;

  @Prop({})
  os?: SessionOs;

  @Prop({})
  browser?: SessionBrowser;

  @Prop({})
  device?: SessionDevice;

  @Prop({})
  cpu?: SessionCPU;

  @Prop({})
  engine?: SessionEngine;

  @Prop({ default: null })
  registrationId?: string;

  @Prop({ ref: () => User, default: null })
  userId?: Ref<User, string>;

  @Prop({ required: true, enum: SessionStatus })
  status!: SessionStatus;
}
