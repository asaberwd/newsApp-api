import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { CreateTagDto } from './dto/create-tag.dto';
import { TagDto } from './dto/tag.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
    constructor(private _tagService: TagsService) {}

    @Post('')
    @ApiOkResponse({ type: TagDto, description: 'tag is added successfully' })
    async createTag(@Body() createTag: CreateTagDto) {
        const newTag = await this._tagService.createTag(createTag);

        return newTag.toDto();
    }

    @Get('')
    @ApiOkResponse({ type: [TagDto], description: 'get all tags' })
    async getTags(): Promise<TagDto[]> {
        const tags = await this._tagService.getTags();
        return tags.toDtos();
    }

    @Get('/:id')
    @ApiOkResponse({ type: TagDto, description: 'get specific tag with id' })
    async getTag(@Param('id') id: string): Promise<TagDto> {
        const tag = await this._tagService.getTag(id);
        return tag.toDto();
    }

    @Delete('/:id')
    @ApiOkResponse({ description: 'delete specific tag with id' })
    async deleteTag(@Param('id') id: string): Promise<void> {
        return this._tagService.deleteTag(id);
    }
}
