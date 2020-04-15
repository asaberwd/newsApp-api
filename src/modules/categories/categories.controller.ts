import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private _categoryService: CategoriesService) {}

    @Post('')
    @ApiOkResponse({
        type: CategoryDto,
        description: 'category is added successfully',
    })
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
    @ApiOkResponse({
        type: CategoryDto,
        description: 'update specific category with id',
    })
    async updateCategory(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCategoryDto: UpdateCategoryDto,
    ): Promise<CategoryDto> {
        return this._categoryService.updateCategory(id, updateCategoryDto);
    }

    @Delete('/:id')
    @ApiOkResponse({ description: 'delete specific tag with id' })
    async deleteTag(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this._categoryService.deleteCategory(id);
    }
}
