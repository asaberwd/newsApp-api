import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { PostEntity } from '../posts/post.entity';
import { CategoryDto } from './dto/category.dto';

@Entity({ name: 'categories' })
export class CategoryEntity extends AbstractEntity<CategoryDto> {
    @PrimaryGeneratedColumn()
    id: number;

    @Index({ unique: true })
    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, unique: true })
    slug: string;

    @Column()
    description: string;

    @OneToMany(
        _ => PostEntity,
        post => post.category,
        { eager: false },
    )
    posts: PostEntity[];
    dtoClass = CategoryDto;
}
