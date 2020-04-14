import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagRepository } from './tag.repository';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
    imports: [TypeOrmModule.forFeature([TagRepository])],
    controllers: [TagsController],
    providers: [TagsService],
    exports: [TagsService],
})
export class TagsModule {}
