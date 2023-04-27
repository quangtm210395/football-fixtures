import { JsonController, Patch, QueryParams } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import winston from 'winston';
import { Service } from 'typedi';

import { Logger } from '@Decorators/Logger';

import { WinstonLogger } from '@Libs/WinstonLogger';

import { ConfigService } from '@Services/ConfigService';

import { ChangeLogLevelReq } from '@Rests/types/ChangeLogLevelReq';

@Service()
@JsonController('/configs')
@OpenAPI({ security: [{ BearerToken: [] }] })
export class ConfigController {
  constructor(
    @Logger(module) private readonly logger: winston.Logger,
    private configService: ConfigService,
  ) {}

  @Patch('/log-level')
  public async changeLogLevel(
    @QueryParams() params: ChangeLogLevelReq,
  ) {
    this.logger.info('changeLogLevel:: changing log level to: ', params.level);
    WinstonLogger.changeLogLevel(params.level);
    return 'OK';
  }
}
