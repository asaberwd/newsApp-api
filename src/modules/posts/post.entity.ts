import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { CategoryEntity } from '../categories/categoty.entity';
import { SourceEntity } from '../sources/source.entity';
import { TagEntity } from '../tags/tag.entity';
import { PostDto } from './dto/post.dto';

@Entity({ name: 'posts' })
export class PostEntity extends AbstractEntity<PostDto> {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    content: string;

    @Column({ nullable: false })
    imageUrl: string;

    @ManyToOne(
        _ => SourceEntity,
        source => source.posts,
        { eager: true },
    )
    source: SourceEntity;
    @Column({ nullable: false })
    sourceId: number;

    @ManyToOne(
        _ => CategoryEntity,
        category => category.posts,
        { eager: true },
    )
    category: CategoryEntity;
    @Column({ nullable: false })
    categoryId: number;

    @ManyToMany(_ => TagEntity)
    @JoinTable({
        name: 'posts_tags',
        joinColumn: { name: 'postId', referencedColumnName: 'id' },
        inverseJoinColumn: {
            name: 'tagId',
            referencedColumnName: 'id',
        },
    })
    tags: TagEntity[];

    dtoClass = PostDto;
}
