import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { CategoryDto } from './dto/category.dto';

@Entity({ name: 'categories' })
export class CategoryEntity extends AbstractEntity<CategoryDto> {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true, unique: true })
    slug: string;

    @Column()
    description: string;

    dtoClass = CategoryDto;
}
