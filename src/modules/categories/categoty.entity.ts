import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { CategoryDto } from './dto/category.dto';

@Entity({ name: 'categories' })
export class CategoryEntity extends AbstractEntity<CategoryDto> {
    // @PrimaryGeneratedColumn()
    // id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, unique: true })
    slug: string;

    @Column()
    description: string;

    dtoClass = CategoryDto;
}
