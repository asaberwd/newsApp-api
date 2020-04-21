import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../../modules/auth/auth.module';
import { TagsModule } from '../tags/tags.module';
import { PostRepository } from './post.repository';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([PostRepository]),
        TagsModule,
    ],
    controllers: [PostsController],
    providers: [PostsService],
})
export class PostsModule {}
