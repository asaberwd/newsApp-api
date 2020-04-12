import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { CategoryEntity } from './categoty.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@EntityRepository(CategoryEntity)
export class CategoryRepository extends Repository<CategoryEntity> {
    async createCategory(
        createCategory: CreateCategoryDto,
    ): Promise<CategoryEntity> {
        let category = this.create(createCategory);

        category = await this.save(category);

        return category;
    }

    async getCategories(): Promise<CategoryEntity[]> {
        return this.find();
    }

    async getTCategory(id: number): Promise<CategoryEntity> {
        const category = await this.findOne(id);
        if (!category) {
            throw new NotFoundException('there is no category with this id');
        }
        return category;
    }

    async deleteCategory(id: number): Promise<void> {
        const category = await this.getTCategory(id);
        await this.delete({ id: category.id });
    }
}
