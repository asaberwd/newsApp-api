import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { Roles } from '../../decorators/roles.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagDto } from './dto/tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
    constructor(private _tagService: TagsService) {}

    @Post('')
    @UseGuards(AuthGuard)
    @ApiOkResponse({ type: TagDto, description: 'tag is added successfully' })
    @ApiBearerAuth()
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
    async getTag(@Param('id', ParseIntPipe) id: number): Promise<TagDto> {
        const tag = await this._tagService.getTag(id);
        return tag.toDto();
    }

    @Put('/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RoleType.ADMIN, RoleType.SUPER_ADMIN)
    @ApiOkResponse({ type: TagDto, description: 'update specific tag with id' })
    @ApiBearerAuth()
    updateTag(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTagDto: UpdateTagDto,
    ): Promise<TagDto> {
        return this._tagService.updateTag(id, updateTagDto);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard)
    @ApiOkResponse({ description: 'delete specific tag with id' })
    @ApiBearerAuth()
    async deleteTag(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this._tagService.deleteTag(id);
    }
}
