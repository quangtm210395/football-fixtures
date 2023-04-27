import  Redis  from 'ioredis';
import { Inject, Service } from 'typedi';
import winston from 'winston';

import { Logger } from '@Decorators/Logger';

import { env } from '@Libs/env';

import { JSONParseError } from '@Errors/JSONParseError';

@Service()
export class ConfigService {
  constructor(
    @Logger(module) private readonly logger: winston.Logger,
    @Inject('cache') private readonly cache: Redis.Redis,
  ) {}

  /**
   * get the config as a string
   * @param key the config key
   * @returns value as a string
   */
  async getByKey(key: string) {
    return this.cache.get(key);
  }

  /**
   * get the config data and convert to number
   * @param key the config key
   * @returns value as a number
   */
  async getDateByKey(key: string) {
    const value = await this.getByKey(key);
    return typeof value === 'string' ? new Date(value) : null;
  }

  /**
   * get the config data and convert to number
   * @param key the config key
   * @returns value as a number
   */
  async getNumberByKey(key: string) {
    const value = await this.getByKey(key);
    return typeof value === 'string' ? Number(value) : null;
  }

  /**
   * get the config data and convert to object
   * @param key the config keys
   * @returns value as a json object
   */
  async getJSONByKey(key: string) {
    const value = await this.getByKey(key);
    try {
      const data = JSON.parse(value);
      return data;
    } catch (error) {
      this.logger.error(`getJSONByKey error, key: ${key}, value: ${value} `, error);
      throw new JSONParseError();
    }
  }

  /**
   * get the config data and convert to an array
   * @param key the config key
   * @returns value as an array of
   */
  async getArrayByKey(key: string) {
    const value = await this.getByKey(key);
    return value.split(',');
  }

  async expireConfigs(prefix?: string) {
    const keys = await this.cache.keys(`${prefix || ''}*`);
    this.logger.info('expireConfigs keys: ', keys);
    for (let key of keys) {
      await this.cache.del(key);
    }
    return keys;
  }

  async keys(prefix?: string) {
    const keys = await this.cache.keys(`${prefix || ''}*`);
    return keys;
  }

  async setByKey(key: string, value: string) {
    await this.cache.setex(key, env.redis.defaultExpirationTimeInSeconds || 300, value);
  }

  async setCache(key: string, value: string) {
    return this.cache.setex(key, env.redis.defaultExpirationTimeInSeconds || 300, value);
  }

  async getCache(key: string) {
    return this.cache.get(key);
  }
}
