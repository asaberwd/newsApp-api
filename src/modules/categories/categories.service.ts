import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CategoryRepository } from './category.repository';
import { CategoryEntity } from './categoty.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoryRepository)
        private _categoryRepository: CategoryRepository,
    ) {}

    createCategory(createCategory: CreateCategoryDto): Promise<CategoryEntity> {
        return this._categoryRepository.createCategory(createCategory);
    }

    getCategories(): Promise<CategoryEntity[]> {
        return this._categoryRepository.getCategories();
    }

    getCategory(id: number): Promise<CategoryEntity> {
        return this._categoryRepository.getTCategory(id);
    }

    deleteCategory(id: number): Promise<void> {
        return this._categoryRepository.deleteCategory(id);
    }
}
