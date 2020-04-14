import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { TagEntity } from '../tags/tag.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './post.entity';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
    async createPost(
        { categoryId, content, sourceId, title, imageUrl }: CreatePostDto,
        tags: TagEntity[],
    ): Promise<PostEntity> {
        let post = new PostEntity();
        post.categoryId = categoryId;
        post.sourceId = sourceId;
        post.title = title;
        post.content = content;
        post.imageUrl = imageUrl;
        post.tags = tags;

        post = await this.save(post);

        return post;
    }

    getPosts(): Promise<PostEntity[]> {
        return this.find({ relations: ['tags'] });
    }

    async getPostById(id: number): Promise<PostEntity> {
        const post = this.findOne(id, { relations: ['tags'] });
        if (!post) {
            throw new NotFoundException('there is no post with this id');
        }
        {
            return post;
        }
    }

    // async deleteSource(id: number): Promise<void> {
    //     const source = await this.getSource(id);
    //     await this.delete({ id: source.id });
    // }
}
