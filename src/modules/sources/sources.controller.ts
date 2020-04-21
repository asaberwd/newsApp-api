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
import { CreateSourceDto } from './dto/create-source.dto';
import { SourceDto } from './dto/source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
import { SourcesService } from './sources.service';

@Controller('sources')
export class SourcesController {
    constructor(private _sourceService: SourcesService) {}

    @Post('')
    @UseGuards(AuthGuard)
    @ApiOkResponse({
        type: SourceDto,
        description: 'source is added successfully',
    })
    @ApiBearerAuth()
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

    @Put('/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RoleType.ADMIN, RoleType.SUPER_ADMIN)
    @ApiOkResponse({
        type: SourceDto,
        description: 'update specific source with id',
    })
    @ApiBearerAuth()
    async updateSource(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateSourceDto: UpdateSourceDto,
    ): Promise<SourceDto> {
        return this._sourceService.updateSource(id, updateSourceDto);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard)
    @ApiOkResponse({ description: 'delete specific source with id' })
    @ApiBearerAuth()
    async deleteSource(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this._sourceService.deleteSource(id);
    }
}
