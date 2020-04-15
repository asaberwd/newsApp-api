import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { CreatePostDto } from './dto/create-post.dto';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private _postsService: PostsService) {}

    @Post('')
    @ApiOkResponse({
        type: PostDto,
        description: 'post is added successfully',
    })
    async createPost(@Body() createPost: CreatePostDto): Promise<PostDto> {
        const post = await this._postsService.createPost(createPost);
        return post.toDto();
    }

    @Get('')
    @ApiOkResponse({ type: [PostDto], description: 'get all posts' })
    async getPosts(): Promise<PostDto[]> {
        const posts = await this._postsService.getPosts();

        return posts.toDtos();
    }

    @Get('/:id')
    @ApiOkResponse({ type: PostDto, description: 'get specific post by id' })
    async getPost(@Param('id') id: string): Promise<PostDto> {
        const post = await this._postsService.getPost(id);

        return post.toDto();
    }

    @Put('/:id')
    @ApiOkResponse({ type: PostDto, description: 'update specific post by id' })
    updatePost(
        @Param('id') id: string,
        @Body() updatePostDto: UpdatePostDto,
    ): Promise<PostDto> {
        return this._postsService.updatePost(id, updatePostDto);
    }
}
