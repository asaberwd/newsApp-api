import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../../modules/auth/auth.module';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoryRepository } from './category.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([CategoryRepository])],
    controllers: [CategoriesController],
    providers: [CategoriesService],
})
export class CategoriesModule {}
