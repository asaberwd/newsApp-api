import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TagEntity } from '../tags/tag.entity';
import { TagsService } from '../tags/tags.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostRepository)
        private _postRepository: PostRepository,
        private _tagService: TagsService,
    ) {}

    async createPost(createPost: CreatePostDto): Promise<PostEntity> {
        let tags: TagEntity[];
        // find tags ny names
        const foundTags = await this._tagService.findTagsByName(
            createPost.tags,
        );

        // if foundTags length === 0 --> insert many tages by names and use the result with post entity
        if (foundTags.length === 0) {
            tags = await this._tagService.insertManyTags(createPost.tags);
        } else if (foundTags.length === createPost.tags.length) {
            tags = foundTags;
        } else {
            const foundTagsNames = foundTags.map(({ name }) => name);
            const notFoundTags = createPost.tags.filter(
                tagName => !foundTagsNames.includes(tagName),
            );
            // then insert many tages by names and use the result with post entity
            const newTags = await this._tagService.insertManyTags(notFoundTags);
            tags = [...foundTags, ...newTags];
        }

        return this._postRepository.createPost(createPost, tags);
    }

    getPosts(): Promise<PostEntity[]> {
        return this._postRepository.getPosts();
    }

    getPost(id: string): Promise<PostEntity> {
        return this._postRepository.getPostById(id);
    }

    updatePost(id: string, updatePostDto: UpdatePostDto): Promise<PostEntity> {
        return this._postRepository.updatePost(id, updatePostDto);
    }
}
