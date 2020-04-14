import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { PostEntity } from '../posts/post.entity';
import { SourceDto } from './dto/source.dto';

@Entity({ name: 'sources' })
export class SourceEntity extends AbstractEntity<SourceDto> {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, unique: true })
    slug: string;

    @Column({ nullable: false, unique: true })
    url: string;

    @OneToMany(
        _ => PostEntity,
        post => post.source,
        { eager: false },
    )
    posts: PostEntity[];
    dtoClass = SourceDto;
}
