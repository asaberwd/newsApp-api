import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { Roles } from '../../decorators/roles.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private _postsService: PostsService) {}

    @Post('')
    @UseGuards(AuthGuard)
    @ApiOkResponse({
        type: PostDto,
        description: 'post is added successfully',
    })
    @ApiBearerAuth()
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
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RoleType.ADMIN, RoleType.SUPER_ADMIN)
    @ApiOkResponse({ type: PostDto, description: 'update specific post by id' })
    updatePost(
        @Param('id') id: string,
        @Body() updatePostDto: UpdatePostDto,
    ): Promise<PostDto> {
        return this._postsService.updatePost(id, updatePostDto);
    }
}
