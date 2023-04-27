import { Service } from 'typedi';
import winston from 'winston';

import { Logger } from '@Decorators/Logger';

import { Club } from '@Entities/Club';

import { ClubRepository } from '@Repositories/ClubRepository';

@Service()
export class ClubService {
  constructor(
    @Logger(module) private readonly logger: winston.Logger,
    private readonly clubRepo: ClubRepository,
  ) {}

  async getAll() {
    return this.clubRepo.findAll();
  }

  async importClubs(clubs: Club[]) {
    return await this.clubRepo.insertMany(clubs);
  }
}
