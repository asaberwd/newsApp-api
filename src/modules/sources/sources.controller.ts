import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { CreateSourceDto } from './dto/create-source.dto';
import { SourceDto } from './dto/source.dto';
import { SourcesService } from './sources.service';

@Controller('sources')
export class SourcesController {
    constructor(private _sourceService: SourcesService) {}

    @Post('')
    @ApiOkResponse({
        type: SourceDto,
        description: 'source is added successfully',
    })
    async createSource(@Body() createSource: CreateSourceDto) {
        const source = await this._sourceService.createSource(createSource);

        return source.toDto();
    }

    @Get('')
    @ApiOkResponse({ type: [SourceDto], description: 'get all sources' })
    async getSources(): Promise<SourceDto[]> {
        const sources = await this._sourceService.getSources();
        return sources.toDtos();
    }

    @Get('/:id')
    @ApiOkResponse({
        type: SourceDto,
        description: 'get specific source with id',
    })
    async getSource(@Param('id', ParseIntPipe) id: number): Promise<SourceDto> {
        const source = await this._sourceService.getSource(id);
        return source.toDto();
    }

    @Delete('/:id')
    @ApiOkResponse({ description: 'delete specific source with id' })
    async deleteSource(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this._sourceService.deleteSource(id);
    }
}
