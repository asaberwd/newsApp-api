import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SourceRepository } from './source.repository';
import { SourcesController } from './sources.controller';
import { SourcesService } from './sources.service';

@Module({
    imports: [TypeOrmModule.forFeature([SourceRepository])],
    controllers: [SourcesController],
    providers: [SourcesService],
})
export class SourcesModule {}
