import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../../modules/auth/auth.module';
import { TagRepository } from './tag.repository';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([TagRepository])],
    controllers: [TagsController],
    providers: [TagsService],
    exports: [TagsService],
})
export class TagsModule {}
