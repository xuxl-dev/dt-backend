import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs/promises';

/*
  FC GQL is to generate Data dict for faster-curd,
  resolvers, entity, etc. shall still be defined by user.
*/

@Injectable()
export class FcGQLService {
  constructor(
    private readonly configService: ConfigService
  ) { }

  collectResolvers() {
    // collect resolvers from metadata
    //TODO

    return {}
  }

  async start() {
    
  }
}