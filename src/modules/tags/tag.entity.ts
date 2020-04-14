import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { TagDto } from './dto/tag.dto';

@Entity({ name: 'tags' })
export class TagEntity extends AbstractEntity<TagDto> {
    @PrimaryGeneratedColumn()
    id: number;

    @Index({ unique: true })
    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, unique: true })
    slug: string;

    dtoClass = TagDto;
}
