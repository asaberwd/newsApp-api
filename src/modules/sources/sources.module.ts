import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../../modules/auth/auth.module';
import { SourceRepository } from './source.repository';
import { SourcesController } from './sources.controller';
import { SourcesService } from './sources.service';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([SourceRepository])],
    controllers: [SourcesController],
    providers: [SourcesService],
})
export class SourcesModule {}
