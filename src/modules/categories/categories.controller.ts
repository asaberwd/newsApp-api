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
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private _categoryService: CategoriesService) {}

    @Post('')
    @UseGuards(AuthGuard)
    @ApiOkResponse({
        type: CategoryDto,
        description: 'category is added successfully',
    })
    @ApiBearerAuth()
    async createCategory(@Body() createTag: CreateCategoryDto) {
        const category = await this._categoryService.createCategory(createTag);

        return category.toDto();
    }

    @Get('')
    @ApiOkResponse({ type: [CategoryDto], description: 'get all categories' })
    async getCategories(): Promise<CategoryDto[]> {
        const categories = await this._categoryService.getCategories();
        return categories.toDtos();
    }

    @Get('/:id')
    @ApiOkResponse({
        type: CategoryDto,
        description: 'get specific category with id',
    })
    async getCategory(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<CategoryDto> {
        const category = await this._categoryService.getCategory(id);
        return category.toDto();
    }

    @Put('/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RoleType.ADMIN, RoleType.SUPER_ADMIN)
    @ApiOkResponse({
        type: CategoryDto,
        description: 'update specific category with id',
    })
    @ApiBearerAuth()
    async updateCategory(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCategoryDto: UpdateCategoryDto,
    ): Promise<CategoryDto> {
        return this._categoryService.updateCategory(id, updateCategoryDto);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard)
    @ApiOkResponse({ description: 'delete specific tag with id' })
    @ApiBearerAuth()
    async deleteTag(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this._categoryService.deleteCategory(id);
    }
}
